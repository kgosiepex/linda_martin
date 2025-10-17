import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
	try {
		// Find guests who have not been sent a reminder and have accepted
		const guests = await prisma.guest.findMany({
			where: {
				rsvp_status: 'accept',
				reminder_sent: false,
			},
		});
		// TODO: Send reminder email/WhatsApp to each guest
		// For now, just mark as sent
		await Promise.all(
			guests.map((guest) =>
				prisma.guest.update({
					where: { id: guest.id },
					data: { reminder_sent: true },
				})
			)
		);
		return new Response(JSON.stringify({ success: true, count: guests.length }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}
