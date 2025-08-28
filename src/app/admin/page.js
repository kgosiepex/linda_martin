'use client';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function AdminPage() {
	const [guestList, setGuestList] = useState([]);
	const [addGuestVisible, setAddGuestVisible] = useState(true);

	// Fetch guest list from API on mount and on demand
	const fetchGuests = async () => {
		try {
			const res = await fetch('/api/admin/guests');
			if (res.ok) {
				const data = await res.json();
				setGuestList(data);
			}
		} catch (err) {
			// Optionally handle error
		}
	};
	useEffect(() => {
		fetchGuests();
	}, []);

	const nameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();

	const handleAddGuest = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value.trim();
		const email = emailRef.current.value.trim();
		const phone = phoneRef.current.value.trim();
		if (!name || !email) {
			toast.error('Name and email are required.');
			return;
		}

		// Generate a 4-digit pin from the phone number (excluding country code and non-digits)
		let pin = '';
		if (phone) {
			// Remove country code (assume starts with '+', remove up to first non-digit)
			let digits = phone.replace(/^\+\d{1,3}/, '');
			// Remove any non-digit characters
			digits = digits.replace(/\D/g, '');
			if (digits.length >= 4) {
				// Randomly select 4 digits from the remaining digits
				const arr = digits.split('');
				for (let i = 0; i < 4; i++) {
					const idx = Math.floor(Math.random() * arr.length);
					pin += arr.splice(idx, 1)[0];
				}
			} else {
				// If not enough digits, pad with random numbers
				while (pin.length < 4) {
					pin += Math.floor(Math.random() * 10).toString();
				}
			}
		} else {
			// No phone, fallback to random 4 digits
			for (let i = 0; i < 4; i++) {
				pin += Math.floor(Math.random() * 10).toString();
			}
		}

		// Send as FormData
		toast.loading('Adding guest...');
		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('email', email);
			formData.append('phone', phone);
			formData.append('pin', pin);
			const res = await fetch('/api/admin/add-guest', {
				method: 'POST',
				body: formData,
			});
			toast.dismiss();
			if (res.ok) {
				const guest = await res.json().catch(() => null);
				toast.success('Guest added successfully!');
				setGuestList((prev) => [...prev, guest || { name, email, phone, pin }]);
				nameRef.current.value = '';
				emailRef.current.value = '';
				phoneRef.current.value = '';
			} else {
				const msg = await res.text();
				toast.error(msg || 'Failed to add guest.');
			}
		} catch (err) {
			toast.dismiss();
			toast.error('Error adding guest.');
		}
	};

	return (
		<div className='container-fluid py-4'>
			<main className='admin-main'>
				<h3
					className='tangerine-bold mt-2 mb-3'
					style={{ textAlign: 'center', fontSize: 48 }}
				>
					Guest List Admin
				</h3>
				{addGuestVisible ? (
					<section
						className='d-flex justify-content-center'
						style={{ marginBottom: 32 }}
					>
						<div>
							<h2 className='text-center'>Add New Guest</h2>
							<form
								className='admin-form'
								onSubmit={handleAddGuest}
								autoComplete='off'
							>
								<input
									name='name'
									placeholder='Name'
									required
									ref={nameRef}
								/>
								<input
									name='email'
									placeholder='Email'
									type='email'
									required
									ref={emailRef}
								/>
								<input
									name='phone'
									placeholder='Phone'
									ref={phoneRef}
								/>
								<button
									className='admin-button w-100'
									type='submit'
									// onClick={handleAddGuest}
								>
									Add Guest
								</button>
							</form>
							<button
								className='admin-button-secondary mt-3 w-100'
								onClick={() => setAddGuestVisible(false)}
							>
								Check Guest List
							</button>
						</div>
					</section>
				) : (
					<section
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<h2 className='mt-5'>Current Invitees</h2>
						<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
							<button
								className='admin-button-secondary mb-3'
								onClick={() => setAddGuestVisible(true)}
							>
								Add New Guest
							</button>
							<button
								className='admin-button-secondary mb-3'
								onClick={fetchGuests}
								type='button'
							>
								Refresh List
							</button>
						</div>
						{guestList.length > 0 ? (
							<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
								<table
									style={{
										width: '80%',
										borderCollapse: 'collapse',
										fontSize: '0.95em',
										maxWidth: '80%',
									}}
								>
									<thead>
										<tr>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Name
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Email
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Phone
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												RSVP
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Table
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Seat
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Food
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Drink
											</th>
											<th
												style={{
													borderBottom: '1px solid #ccc',
													textAlign: 'left',
													padding: '8px',
												}}
											>
												Dietary
											</th>
										</tr>
									</thead>
									<tbody>
										{guestList.map((guest) => (
											<tr key={guest.id}>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.name}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.email}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.phone || ''}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.rsvp_status ? 'Yes' : 'No'}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.table ?? ''}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.seat ?? ''}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{[guest.starch, guest.protein, guest.salad, guest.dessert]
														.filter(Boolean)
														.join(', ')}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.drink || ''}
												</td>
												<td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
													{guest.dietary_requirements || ''}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p style={{ textAlign: 'center', width: '100%' }}>No guests found.</p>
						)}
						<style jsx>{`
							@media (max-width: 600px) {
								section {
									align-items: center !important;
								}
								table {
									width: 100% !important;
									font-size: 0.9em !important;
								}
							}
						`}</style>
					</section>
				)}
			</main>
		</div>
	);
}
