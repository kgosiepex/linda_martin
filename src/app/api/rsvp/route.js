import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const data = await req.json();
		const { token, rsvp_status, meal_choice, dietary_requirements } = data;
		if (!token) {
			return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400 });
		}
		const guest = await prisma.guest.update({
			where: { unique_token: token },
			data: {
				rsvp_status,
				meal_choice,
				dietary_requirements,
			},
		});
		// TODO: Send confirmation email/WhatsApp here
		return new Response(JSON.stringify({ success: true, guest }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}
