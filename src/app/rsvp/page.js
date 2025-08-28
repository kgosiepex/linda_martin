'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Details from '../Details';

export default function RSVPPage() {
	const [step, setStep] = useState(1);
	const [attendance, setAttendance] = useState('');
	const [phone, setPhone] = useState('');
	const [checking, setChecking] = useState(false);
	const [pin, setPin] = useState('');
	const [pinVerified, setPinVerified] = useState(false);
	const [diet, setDiet] = useState('');
	const [meal, setMeal] = useState('');
	const [selectedMeals, setSelectedMeals] = useState({
		starch: '',
		protein: '',
		salad: '',
		dessert: '',
		drink: '',
	});

	const mealOptions = {
		starch: ['Rice', 'Pasta', 'Potatoes'],
		protein: ['Beef', 'Chicken', 'Fish', 'Vegetarian'],
		salad: ['Greek Salad', 'Caesar Salad', 'Garden Salad'],
		dessert: ['Cheesecake', 'Fruit Salad', 'Chocolate Mousse'],
		drink: ['Water', 'Juice', 'Wine', 'Beer', 'Soft Drink'],
	};

	// Step 1: Attendance Confirmation
	const [guestFound, setGuestFound] = useState(null);
	// If guestFound is set and rsvp_status is true, skip to schedule
	React.useEffect(() => {
		if (guestFound && guestFound.rsvp_status === true) {
			setAttendance('yes');
			// Check if meal info is missing (any of starch, protein, salad, dessert, drink is falsy)
			const needsMeal =
				!guestFound.starch ||
				!guestFound.protein ||
				!guestFound.salad ||
				!guestFound.dessert ||
				!guestFound.drink;
			if (needsMeal) {
				setStep(3);
				toast.loading('Welcome back! Please complete your meal selection.');
				toast.dismiss();
			} else {
				setStep(4);
				toast.loading('Welcome back! You have already confirmed your attendance.');
				toast.dismiss();
			}
		}
	}, [guestFound]);

	const renderAttendance = () => (
		<section className='rsvp-attendance'>
			<h1 className='tangerine-regular'>Will you be attending?</h1>
			{!guestFound && (
				<>
					<p className='notify'>
						Please ensure you also include your country code in your phone number.
						<br /> for example, +263123456789. without any spaces or dashes.
					</p>
					<input
						type='tel'
						placeholder='Enter your phone number'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className='rsvp-input mb-3'
						style={{ maxWidth: 300, margin: '0 auto', textAlign: 'center' }}
						disabled={checking || guestFound}
					/>
					<input
						type='text'
						placeholder='Enter your 4-digit pin'
						value={pin}
						onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
						className='rsvp-input mb-3'
						style={{ maxWidth: 300, margin: '0 auto', textAlign: 'center' }}
						disabled={checking || guestFound}
					/>
				</>
			)}
			{!guestFound && (
				<button
					onClick={async () => {
						if (!phone) {
							toast.error('Please enter your phone number.');
							return;
						}
						if (!pin || pin.length !== 4) {
							toast.error('Please enter your 4-digit pin.');
							return;
						}
						setChecking(true);
						toast.loading('Checking guestlist...');
						try {
							const res = await fetch('/api/admin/guests', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ phone }),
							});
							toast.dismiss();
							if (res.ok) {
								const guest = await res.json();
								if (guest.pin && guest.pin === pin) {
									toast.success(`Welcome, ${guest.name}! Please confirm your attendance.`);
									setGuestFound(guest);
									setPinVerified(true);
								} else {
									toast.error('Incorrect pin. Please try again.');
									setPinVerified(false);
								}
							} else {
								toast.error('Phone number not found. Please check your details and try again.');
							}
						} catch (err) {
							toast.dismiss();
							toast.error('Error checking guestlist.');
						} finally {
							setChecking(false);
						}
					}}
					className='admin-button'
					disabled={checking}
				>
					Check Guestlist
				</button>
			)}
			{guestFound && pinVerified && (
				<div style={{ marginTop: 24, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
					<p className='notify'>
						Hi {guestFound.name}, <br /> please confirm your attendance:
					</p>
					<div className='rsvp-btn-group'>
						<button
							className='admin-button'
							onClick={async () => {
								if (!guestFound) return;
								try {
									toast.loading('Updating RSVP...');
									const res = await fetch('/api/admin/guests', {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({ phone: guestFound.phone, rsvp_status: true }),
									});
									toast.dismiss();
									console.log(res);
									if (res.ok) {
										toast.success('RSVP confirmed!');
										setAttendance('yes');
										setStep(2);
									} else {
										toast.error('Failed to update RSVP.');
									}
								} catch (err) {
									toast.dismiss();
									toast.error('Error updating RSVP.');
								}
							}}
						>
							Yes, I will attend
						</button>
						<button
							className='rsvp-no-btn'
							onClick={async () => {
								if (!guestFound) return;
								try {
									toast.loading('Updating RSVP...');
									const res = await fetch('/api/admin/guests', {
										method: 'PUT',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({ phone: guestFound.phone, rsvp_status: false }),
									});
									toast.dismiss();
									console.log(res);
									if (res.ok) {
										toast.success('RSVP updated.');
										setAttendance('no');
										setStep(3);
									} else {
										toast.error('Failed to update RSVP.');
									}
								} catch (err) {
									toast.dismiss();
									toast.error('Error updating RSVP.');
								}
							}}
						>
							No, I cannot attend
						</button>
					</div>
					<style jsx>{`
						.rsvp-btn-group {
							display: flex;
							gap: 16px;
							justify-content: center;
							margin-top: 16px;
							flex-direction: row;
						}
						@media (max-width: 600px) {
							.rsvp-btn-group {
								flex-direction: column;
								gap: 10px;
								align-items: stretch;
							}
						}
					`}</style>
				</div>
			)}
		</section>
	);

	// Step 2: Thank You
	const renderThankYou = () => (
		<section className='thankyou-header'>
			<h1 className='tangerine-regular'>Thank You!</h1>
			<p className='notify'>
				Your RSVP has been received. This invite is strictly for 1.
				<br />
				Guest substitutions are not allowed. No plus ones. No children.
			</p>

			<button
				onClick={() => setStep(3)}
				className='admin-button'
			>
				Continue
			</button>
		</section>
	);

	// Step 3: Dietary Requirements & Meal Choices
	const renderDietMeal = () => (
		<section className='rsvp-diet-meal'>
			<h2 className='tangerine-regular'>Dietary Information/Allergies</h2>
			<textarea
				placeholder='Please specify any dietary restrictions'
				value={diet}
				onChange={(e) => setDiet(e.target.value)}
				className='rsvp-input admin-form'
				rows={4}
			/>
			<h2 className='tangerine-regular'>Meal Choice</h2>
			<div className='container'>
				<div className='row justify-content-center align-items-center'>
					{Object.entries(mealOptions).map(([category, options]) => (
						<div
							className='col-12 col-md-6 col-lg-3 mb-3 d-flex flex-column align-items-center'
							key={category}
						>
							<label className='text-capitalize fw-semibold mb-2'>{category}</label>
							<select
								className='form-select text-center'
								value={selectedMeals[category] || ''}
								onChange={(e) => {
									setSelectedMeals((prev) => ({ ...prev, [category]: e.target.value }));
								}}
							>
								<option value=''>Select {category}</option>
								{options.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option}
									</option>
								))}
							</select>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={async () => {
					if (!guestFound) return;
					console.log('Selected meals:', selectedMeals);
					console.log(guestFound);
					if (Object.values(selectedMeals).some((v) => !v)) return;
					try {
						toast.loading('Saving meal choices...');
						const res = await fetch('/api/admin/guests', {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								phone: guestFound.phone,
								dietary_requirements: diet,
								...selectedMeals,
							}),
						});
						toast.dismiss();
						if (res.ok) {
							toast.success('Meal choices saved!');
							setStep(4);
						} else {
							toast.error('Failed to save meal choices.');
						}
					} catch (err) {
						toast.dismiss();
						toast.error('Error saving meal choices.');
					}
				}}
				className='admin-button mt-5'
				disabled={Object.values(selectedMeals).some((v) => !v)}
			>
				Next
			</button>
		</section>
	);

	// Step 4: Details
	const renderSchedule = () => (
		<section className='rsvp-schedule'>
			<h2>Wedding Details</h2>
			<Details />
			{/* <button
				onClick={() => setStep(5)}
				className='rsvp-btn'
			>
				Show Location
			</button> */}
		</section>
	);

	// // Step 5: Location
	// const renderLocation = () => (
	// 	<section className='rsvp-location'>
	// 		<h2>Wedding Location</h2>
	// 		<p>
	// 			<strong>{location.name}</strong>
	// 		</p>
	// 		<p>{location.address}</p>
	// 		<a
	// 			href={location.mapUrl}
	// 			target='_blank'
	// 			rel='noopener noreferrer'
	// 			className='rsvp-btn'
	// 		>
	// 			View on Map
	// 		</a>
	// 	</section>
	// );

	return (
		<main className='rsvp-main'>
			{step === 1 && renderAttendance()}
			{step === 2 && renderThankYou()}
			{step === 3 && attendance === 'yes' && renderDietMeal()}
			{step === 4 && attendance === 'yes' && renderSchedule()}
			{step === 5 && attendance === 'yes' && renderLocation()}
			{step === 3 && attendance === 'no' && (
				<section className='rsvp-sorry'>
					<h2>We&apos;re sorry you can&apos;t make it.</h2>
				</section>
			)}
		</main>
	);
}
