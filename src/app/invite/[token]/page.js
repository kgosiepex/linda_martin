import { PrismaClient } from '@prisma/client';
import React from 'react';

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
	const { token } = context.params;
	const guest = await prisma.guest.findUnique({
		where: { unique_token: token },
	});
	if (!guest) {
		return { notFound: true };
	}
	return { props: { guest } };
}

export default function InvitePage({ guest }) {
	return (
		<main className='invite-main'>
			<section className='invite-header'>
				<h1 className='tangerine-regular'>You&apos;re Invited</h1>
				<h2 className='tangerine-bold'>{guest.name}</h2>
				<p>We are delighted to invite you to the wedding of Linda & Martin.</p>
				<p>
					Date: <strong>28.11.26</strong>
				</p>
				<p>
					Venue: <strong>Portsea Beach & Portsea Hotel</strong>
				</p>
				<p>
					Dress Code: <strong>Black Tie</strong>
				</p>
			</section>
			<section className='invite-rsvp'>
				<h3>RSVP</h3>
				{/* RSVP form will go here */}
				<form>
					<label>
						Will you attend?
						<select name='rsvp_status'>
							<option value='accept'>Accept</option>
							<option value='decline'>Decline</option>
						</select>
					</label>
					<label>
						Meal Choice
						<input
							name='meal_choice'
							placeholder='e.g. Beef, Fish, Vegetarian'
						/>
					</label>
					<label>
						Dietary Requirements
						<input
							name='dietary_requirements'
							placeholder='Allergies, etc.'
						/>
					</label>
					<button type='submit'>Submit RSVP</button>
				</form>
			</section>
		</main>
	);
}
