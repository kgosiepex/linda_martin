'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../public/css/AdminPage.module.css';
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
		<div className={styles.adminMain}>
			<main>
				<h2 className={styles.title}>Admin</h2>
				{addGuestVisible ? (
					<section
						className={styles.section}
						style={{ background: 'rgba(0,0,0,0.85)' }}
					>
						<div>
							<h3
								className={styles.sectionTitle}
								style={{ color: '#fff' }}
							>
								Add New Guest
							</h3>
							<form
								className={styles.form}
								onSubmit={handleAddGuest}
								autoComplete='off'
								style={{ background: 'transparent' }}
							>
								<input
									name='name'
									placeholder='Name'
									required
									ref={nameRef}
									style={{
										background: '#111',
										color: '#fff',
										width: '100%',
										boxSizing: 'border-box',
									}}
								/>
								<input
									name='email'
									placeholder='Email'
									type='email'
									required
									ref={emailRef}
									style={{
										background: '#111',
										color: '#fff',
										width: '100%',
										boxSizing: 'border-box',
									}}
								/>
								<input
									name='phone'
									placeholder='Phone'
									ref={phoneRef}
									style={{
										background: '#111',
										color: '#fff',
										width: '100%',
										boxSizing: 'border-box',
									}}
								/>
								<button
									className={styles.button}
									type='submit'
									style={{ background: '#fff', color: '#000' }}
								>
									Add Guest
								</button>
							</form>
							<button
								className={styles.button}
								style={{ backgroundColor: '#000', color: '#fff', marginTop: '12px' }}
								onClick={() => setAddGuestVisible(false)}
							>
								Check Guest List
							</button>
						</div>
					</section>
				) : (
					<section
						className={styles.section}
						style={{ background: 'rgba(0,0,0,0.85)' }}
					>
						<h3
							className={styles.sectionTitle}
							style={{ color: '#fff' }}
						>
							Current Invitees
						</h3>
						<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
							<button
								className={styles.button}
								style={{ backgroundColor: '#000', color: '#fff' }}
								onClick={() => setAddGuestVisible(true)}
							>
								Add New Guest
							</button>
							<button
								className={styles.button}
								style={{ backgroundColor: '#000', color: '#fff' }}
								onClick={fetchGuests}
								type='button'
							>
								Refresh List
							</button>
						</div>
						{guestList.length > 0 ? (
							<div style={{ width: '100%', overflowX: 'auto' }}>
								<table
									style={{
										width: '100%',
										borderCollapse: 'collapse',
										fontSize: '0.95em',
										maxWidth: '100%',
										background: '#111',
										color: '#fff',
									}}
								>
									<thead>
										<tr style={{ background: '#222', color: '#fff' }}>
											<th>Name</th>
											<th>Email</th>
											<th>Phone</th>
											<th>RSVP</th>
											<th>Table</th>
											<th>Seat</th>
											<th>Food</th>
											<th>Drink</th>
											<th>Dietary</th>
										</tr>
									</thead>
									<tbody>
										{guestList.map((guest) => (
											<tr
												key={guest.id}
												style={{ background: 'transparent', color: '#fff' }}
											>
												<td>{guest.name}</td>
												<td>{guest.email}</td>
												<td>{guest.phone || ''}</td>
												<td>{guest.rsvp_status ? 'Yes' : 'No'}</td>
												<td>{guest.table ?? ''}</td>
												<td>{guest.seat ?? ''}</td>
												<td>
													{[guest.starch, guest.protein, guest.salad, guest.dessert]
														.filter(Boolean)
														.join(', ')}
												</td>
												<td>{guest.drink || ''}</td>
												<td>{guest.dietary_requirements || ''}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p style={{ textAlign: 'center', width: '100%' }}>No guests found.</p>
						)}
					</section>
				)}
			</main>
		</div>
	);
}
