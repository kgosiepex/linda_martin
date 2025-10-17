'use client';
import { useEffect, useState } from 'react';
import styles from '/public/css/Schedule.module.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

const fetchMessages = async () => {
	const res = await fetch('/api/admin/guests');
	if (!res.ok) return [];
	const guests = await res.json();
	return guests.filter(
		(g) => g.message && g.message.trim() !== '' && g.message.trim().toLowerCase() !== 'none'
	);
};

export default function MessagesPage() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		fetchMessages().then(setMessages);
	}, []);

	console.log(messages);
	return (
		<div style={{ maxWidth: 600, margin: '0 auto', padding: '2em 1em' }}>
			<h6
				style={{
					fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
					fontWeight: 300,
					fontSize: '1.1em',
					marginBottom: '3em',
					marginTop: '1em',
					textAlign: 'center',
					textTransform: 'uppercase',
					letterSpacing: '0.25em',
				}}
			>
				Linda &amp; Martin&apos;s Wedding
			</h6>
			<h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Messages for the Couple</h2>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				navigation
				pagination={false}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				spaceBetween={30}
				slidesPerView={1}
				loop={true}
				style={{ minHeight: '200px' }}
			>
				{messages.length === 0 ? (
					<SwiperSlide>
						<div style={{ textAlign: 'center', color: '#888' }}>No messages yet.</div>
					</SwiperSlide>
				) : (
					messages.map((msg, idx) => (
						<SwiperSlide key={idx}>
							<div
								style={{
									background: '#fff',
									borderRadius: '12px',
									boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
									padding: '1.5em',
									minHeight: '180px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									fontSize: '1.1em',
									wordBreak: 'break-word',
								}}
							>
								<div style={{ marginBottom: '1em', fontStyle: 'italic', color: '#333' }}>
									&ldquo;{msg.message}&rdquo;
								</div>
								<div style={{ fontWeight: 600, color: 'black', fontSize: '0.95em' }}>
									— {msg.name}
								</div>
							</div>
						</SwiperSlide>
					))
				)}
			</Swiper>
		</div>
	);
}
