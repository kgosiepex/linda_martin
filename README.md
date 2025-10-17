# Wedding Invitation Website (Black Tie)

Private wedding invitation site with RSVP and meal selection, built with **Next.js** and **MongoDB**.

## Requirements

- **Private access**: Only 60 invited guests. Each guest gets a unique invite link (`/invite/[token]`).
- **Guest model (MongoDB)**:
  - `id`
  - `name`
  - `email`
  - `phone`
  - `unique_token` (used in invite link)
  - `rsvp_status` (accept/decline)
  - `meal_choice`
  - `dietary_requirements`
  - `reminder_sent` (boolean)
- **Pages**:
  - `/invite/[token]` → Personalized landing page with event details (venue, date, time, dress code: Black Tie) + RSVP form (accept/decline, meal, dietary requirements).
  - `/thank-you` → Confirmation page after RSVP.
- **API routes**:
  - `POST /api/rsvp` → Saves RSVP & meal info to MongoDB, sends confirmation email/WhatsApp.
  - `POST /api/reminder` → Sends reminders (email + WhatsApp) one week before wedding with directions link.
- **Integration**:
  - Email: Nodemailer or SendGrid.
  - WhatsApp: Twilio or Meta WhatsApp Cloud API.
- **Scheduler**: Vercel Cron Jobs calling `/api/reminder`.
- **Styling**: TailwindCSS with a simple, elegant **black tie** theme.
- **Deployment**: Vercel.

## Tech Stack

- Next.js (App Router)
- MongoDB Atlas (database)
- Prisma (ORM)
- TailwindCSS (styling)
- Nodemailer / SendGrid (email)
- Twilio / WhatsApp Cloud API (WhatsApp)

## Project Structure
