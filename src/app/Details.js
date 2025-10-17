/* eslint-disable @next/next/no-img-element */
import styles from '/public/css/Schedule.module.css';
import SwipeGallery from './SwipeGallery';

const scheduleData = [
	{
		time: '14:00',
		title: 'Ceremony',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
	{
		time: '15:30',
		title: 'Photos',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
	{
		time: '17:30',
		title: 'Reception',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
	{
		time: '19:00',
		title: 'Cake Cutting',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
	{
		time: '20:00',
		title: 'Dance',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
	{
		time: '23:00',
		title: 'Grand Exit',
		location: 'Sparrow Boutique Hotel',
		address: 'Bulawayo, Zimbabwe',
		directionsLink:
			'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw',
	},
];

const Details = () => (
	<>
		{/* Dresscode Section */}
		<div className='container mb-4'>
			<div className='row align-items-center'>
				<div className='col-12 col-lg-6 text-center mb-3 mb-lg-0'>
					<h2 className={styles.giftPolicy}>Timeless Grandeur</h2>
					<p
						style={{
							fontWeight: 600,
							fontSize: '1.2em',
							letterSpacing: '0.05em',
							marginBottom: '0.5em',
						}}
					>
						Dresscode:
					</p>
					<div
						style={{
							textAlign: 'left',
							margin: '0 auto',
							maxWidth: '500px',
							background: 'rgba(0,0,0,0.5)',
							borderRadius: '12px',
							padding: '1em',
							color: '#fff',
							boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
						}}
					>
						<div style={{ marginBottom: '0.7em' }}>
							<span
								style={{
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									fontSize: '1em',
								}}
							>
								Men:
							</span>
							<span style={{ marginLeft: '0.5em' }}>
								Classic tuxedos with black bow ties, polished shoes, optional pocket watches or
								cufflinks with a vintage touch.
							</span>
						</div>
						<div>
							<span
								style={{
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									fontSize: '1em',
								}}
							>
								Women:
							</span>
							<span style={{ marginLeft: '0.5em' }}>
								Floor-length evening gowns in black, white. Hair fascinators as statement
								pieces—lace, feathers, pearls, or jeweled designs. Gloves optional for added
								refinement.
							</span>
						</div>
					</div>
				</div>
				<div className='col-12 col-lg-6 d-flex justify-content-center'>
					<div style={{ width: '100%' }}>
						<SwipeGallery />
					</div>
				</div>
			</div>
		</div>

		<div>
			{/* <h2 className={styles.giftPolicy}>Gift Policy</h2> */}
			<p
				className='notify giftPolicy mb-3 mt-5'
				style={{
					width: '100%',
					left: 0,
					position: 'relative',
					margin: '0 auto',
					textAlign: 'center',
				}}
			>
				We kindly request that gifts be strictly limited to{' '}
				<strong>cash, vouchers, or gift cards</strong> only. Thank you for your understanding.
			</p>
			<h2 className={`mt-5 ${styles.giftPolicy}`}>Wedding Venue</h2>
			<h6
				style={{
					fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
					fontWeight: 300,
					fontSize: '1.1em',
					marginBottom: '1em',
					marginTop: '1em',
					textAlign: 'center',
					textTransform: 'uppercase',
					letterSpacing: '0.25em',
				}}
			>
				Sparrow Boutique Hotel
			</h6>
			<div style={{ width: '100vw', margin: '0 calc(-50vw + 50%) 1.5em calc(-50vw + 50%)' }}>
				<img
					src='/img/venue.jpg'
					alt='Sparrow Boutique Hotel Venue'
					style={{ width: '100vw', height: 'auto', display: 'block' }}
				/>
			</div>
			<div
				style={{
					fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
					fontSize: '1.05em',
					fontWeight: 400,
					background: 'rgba(0,0,0,0.5)',
					color: '#fff',
					borderRadius: '12px',
					padding: '1em',
					margin: '0 auto 1.5em auto',
					maxWidth: '700px',
					boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
					textAlign: 'left',
				}}
			>
				Set in the heart of Burnside, Bulawayo, Sparrow Boutique Hotel provides the perfect stage
				for Timeless Grandeur. With its refined architecture, serene ambiance, and luxurious spaces,
				the hotel transforms into an elegant haven where black-tie sophistication meets opulent
				celebration. Every detail—from the grand interiors to the boutique charm—creates an
				atmosphere of exclusivity and grace, ensuring a wedding experience that is as enduring as it
				is majestic.
			</div>

			<div
				style={{
					width: '100vw',
					// maxWidth: '700px',
					margin: '0 calc(-50vw + 50%)',
					borderRadius: '12px',
					overflow: 'hidden',
					boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
				}}
			>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.510268539291!2d28.6247321!3d-20.2270526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eb557bd003ff96f%3A0x836ddfc55f0ce060!2sSparrow%20Boutique%20Hotel!5e1!3m2!1sen!2szw!4v1757867183557!5m2!1sen!2szw'
					style={{ border: 0, width: '100vw', height: '320px', display: 'block' }}
					allowFullScreen={true}
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
					title='Venue Map'
				></iframe>
			</div>
		</div>
		<div className={`mt-5 ${styles.scheduleContainer}`}>
			<h2 className={styles.date}>18.10.25:Schedule of Events</h2>
			<div className={styles.timeline}>
				{scheduleData.map((event, index) => {
					const iconMap = {
						Ceremony: '001-wedding-rings.png',
						Photos: '002-photo-camera.png',
						Reception: '003-dinner.png',
						'Cake Cutting': '004-wedding-cake.png',
						Dance: '005-gramophone.png',
						'Grand Exit': '006-wedding-car.png',
					};
					const iconSrc = `/img/icons/${iconMap[event.title] || 'default.png'}`;
					return (
						<div
							key={index}
							className={styles.event}
							style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
						>
							<img
								src={iconSrc}
								alt={event.title + ' icon'}
								style={{ width: '4em', height: '4em', objectFit: 'contain', minWidth: '2em' }}
							/>
							<div style={{ flex: 1 }}>
								<p className={styles.time}>{event.time}</p>
								<div className={styles.details}>
									<h3>{event.title}</h3>
									{/*{event.location && <p>{event.location}</p>}
										{event.address && <p>{event.address}</p>}
									   {event.directionsLink && (
										   <a
											   href={event.directionsLink}
											   target='_blank'
											   rel='noopener noreferrer'
										   >
											   Get Directions
										   </a>
									   )} */}
									{event.description && <p className={styles.description}>{event.description}</p>}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	</>
);

export default Details;
