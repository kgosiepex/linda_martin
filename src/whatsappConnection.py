import json
import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# ---------- CONFIGURATION ----------

# *** THE ONLY CHANGE IS HERE ***
# Use triple quotes to define the entire multi-line string correctly.
REMINDER_MESSAGE_TEMPLATE = """Hi {name}, 
this is an *automated* reminder for Linda Dube & Martin Shone’s wedding.

The RSVP deadline is today. Please use the wedding website and details that were sent to you to add your:
1. RSVP
Dietary Requirements
Message to the couple

All details (dress code, venue, etc.) and any other relevant information are on the website.

If you have any challenges with the site, kindly share the above info directly with us to ensure that we can assist you promptly and keep the events well organized. 

*_Failure to respond by the end of today may result in your RSVP not being processed and you are assumed not to be attending the wedding._*

If you have already RSVPed, please disregard this message.

Your cooperation is greatly appreciated. Thank you!"""

# Selenium and Chrome Configuration
CHROME_DRIVER_PATH = "d:\\Projects\\4SquaredEvents\\Linda-Martin-Wedding\\chrome-win64\\chromedriver.exe"
PROFILE_DIR = "d:\\Projects\\4SquaredEvents\\Linda-Martin-Wedding\\User_Data"
# -----------------------------------


def load_guests_to_remind(json_file_path):
    """
    Loads guests from a JSON file. Each guest should have 'name' and 'phone'.
    """
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            guests = json.load(f)
        return guests
    except Exception as e:
        print(f"An error occurred while reading the JSON file: {e}")
        return []


def setup_driver():
    """Initializes the Chrome WebDriver with a persistent user profile."""
    chrome_options = Options()
    chrome_options.add_experimental_option(
        'excludeSwitches', ['enable-logging'])
    if PROFILE_DIR:
        chrome_options.add_argument(f"user-data-dir={PROFILE_DIR}")
    service = Service(CHROME_DRIVER_PATH)
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


def type_multiline(element, text):
    """Types a multiline string into an element, preserving line breaks."""
    lines = text.split("\n")
    for i, line in enumerate(lines):
        element.send_keys(line)
        # Only press SHIFT+ENTER if it's not the last line
        if i < len(lines) - 1:
            element.send_keys(Keys.SHIFT, Keys.ENTER)


def send_reminder(driver, number, message):
    """
    Navigates to the user's chat and sends a simple text message.
    """
    try:
        print(f"--- Sending reminder to: {number} ---")
        driver.get(f"https://web.whatsapp.com/send?phone={number}")
        wait = WebDriverWait(driver, 40)

        # Wait for the main message box to be ready
        message_box = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, '//div[@contenteditable="true"][@data-tab="10"]'))
        )

        # Type the personalized message and send it
        type_multiline(message_box, message)
        message_box.send_keys(Keys.ENTER)

        print("Message sent. Waiting for confirmation (tick mark)...")
        # Wait for the "pending" clock icon to disappear from the last message sent
        WebDriverWait(driver, 60).until(
            EC.invisibility_of_element_located(
                (By.XPATH,
                 "(//div[@role='row'])[last()]//span[@data-testid='msg-time']")
            )
        )
        print(f"✅ Reminder successfully sent to {number}")
        time.sleep(4)  # A brief pause before the next person

    except TimeoutException:
        print(
            f"❌ FAILED to send to {number}. Timed out. The number might be invalid or unreachable.")
        driver.save_screenshot(f"error_reminder_{number}.png")
    except Exception as e:
        print(f"❌ An unexpected error occurred for {number}: {e}")


def main():
    """Main function to run the reminder script."""
    json_file_path = "lmweddingdb.NoRSVPGuest.json"
    guests = load_guests_to_remind(json_file_path)

    if not guests:
        print("No guests found needing a reminder, or the JSON file is empty/missing.")
        return

    print(f"Found {len(guests)} guests to remind.")

    driver = setup_driver()
    driver.get("https://web.whatsapp.com")
    print("\nWebDriver started. Please scan the QR code if you are not logged in.")
    print("The script will begin sending reminders in 10 seconds...")
    time.sleep(10)

    for guest in guests:
        name = guest.get('name')
        number = guest.get('phone')

        clean_number = "".join(filter(str.isdigit, str(number)))
        if not clean_number:
            print(f"Skipping invalid number for guest: {name}")
            continue

        # Personalize the message from the template
        formatted_message = REMINDER_MESSAGE_TEMPLATE.format(name=name)
        send_reminder(driver, clean_number, formatted_message)

    print("\n--- All reminder messages have been processed. ---")
    print("The browser will remain open for inspection. Press Enter in this window to close it.")
    input()
    driver.quit()


if __name__ == "__main__":
    main()
