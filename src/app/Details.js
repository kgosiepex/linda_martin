import styles from '/public/css/Schedule.module.css';
import SwipeGallery from './SwipeGallery';

const scheduleData = [
	{
		time: '4:00pm',
		title: 'Ceremony',
		location: 'Bulawayo City Hall Gardens',
		address: '8th Avenue, Bulawayo, Zimbabwe',
		directionsLink:
			'http://maps.google.com/maps?q=Bulawayo+City+Hall+Gardens,+8th+Avenue,+Bulawayo,+Zimbabwe',
	},
	{
		time: '4:45pm',
		title: 'Group & Family Photos',
		location: 'Bulawayo City Hall Gardens',
		address: '8th Avenue, Bulawayo, Zimbabwe',
		directionsLink:
			'http://maps.google.com/maps?q=Bulawayo+City+Hall+Gardens,+8th+Avenue,+Bulawayo,+Zimbabwe',
		description: 'Join us for formal family and group photos after the ceremony.',
	},
	{
		time: '5:30pm',
		title: 'Welcome Drinks & Canapés',
		location: 'The Kingdom Hotel Lounge',
		address: '26 Selous Avenue, Bulawayo, Zimbabwe',
		directionsLink:
			'http://maps.google.com/maps?q=The+Kingdom+Hotel,+26+Selous+Avenue,+Bulawayo,+Zimbabwe',
		description: 'Please let us know if you will be around so we can cater for everyone.',
	},
	{
		time: '6:30pm',
		title: 'Reception Begins',
		location: 'The Kingdom Hotel Ballroom',
		address: '26 Selous Avenue, Bulawayo, Zimbabwe',
		directionsLink:
			'http://maps.google.com/maps?q=The+Kingdom+Hotel,+26+Selous+Avenue,+Bulawayo,+Zimbabwe',
	},
	{
		time: '6:45pm',
		title: 'Cocktail Hour / Mingling',
		description: 'Guests enjoy drinks and light snacks before dinner.',
	},
	{
		time: '7:30pm',
		title: 'Dinner Service',
		description:
			'Three-course meal with pre-selected options: starch, protein, salad, dessert, and drinks.',
	},
	{
		time: '8:30pm',
		title: 'Speeches & Toasts',
		description: 'Family and close friends give speeches, followed by a champagne toast.',
	},
	{
		time: '9:00pm',
		title: 'First Dance & General Dancing',
		description: 'The newlyweds have their first dance, followed by open dancing for all guests.',
	},
	{
		time: '10:30pm',
		title: 'Cake Cutting',
		description: 'Join the couple for the ceremonial cake cutting.',
	},
	{
		time: '11:30pm',
		title: 'Send-Off',
		description: 'Farewell to guests, with sparklers or confetti.',
	},
];

const Details = () => (
	<>
		{/* Dresscode Section */}
		<div style={{ marginBottom: 32, textAlign: 'center' }}>
			<h4 className={styles.giftPolicy}>Black Tie Theme</h4>
			{/* <p
					className='notify'
					style={{ marginBottom: 16 }}
				>
					Formal/Black Tie Optional
					<br />
					<span style={{ fontSize: '0.95em' }}>
						Gentlemen: Suits or tuxedos. <br />
						Ladies: Evening dresses or formal attire. <br />
						See examples below:
					</span>
				</p> */}
			<SwipeGallery />
		</div>

		<div>
			<h2 className={styles.giftPolicy}>Gift Policy</h2>
			<p className='notify giftPolicy'>
				We kindly request that gifts be strictly limited to{' '}
				<strong>cash, vouchers, or gift cards</strong> only. Thank you for your understanding.
			</p>
		</div>
		<div className={styles.scheduleContainer}>
			<h2 className={styles.date}>18.10.25</h2>
			<div className={styles.timeline}>
				<div className={styles.line} />
				<h2 className={styles.scheduleTitle}>Schedule of Events</h2>
				<div className={styles.schedule}>
					<h3>We will update you with the event schedule as it becomes available.</h3>
				</div>

				{/* {scheduleData.map((event, index) => (
					<div
						key={index}
						className={styles.event}
					>
						<p className={styles.time}>{event.time}</p>
						<div className={styles.details}>
							<h3>{event.title}</h3>
							{event.location && <p>{event.location}</p>}
							{event.address && <p>{event.address}</p>}
							{event.directionsLink && (
								<a
									href={event.directionsLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									Get Directions
								</a>
							)}
							{event.description && <p className={styles.description}>{event.description}</p>}
						</div>
					</div>
				))} */}
			</div>
		</div>
	</>
);

export default Details;
