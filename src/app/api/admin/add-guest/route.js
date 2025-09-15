import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const formData = await req.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const pin = formData.get('pin');

		// console.log('Received data:', { name, email, phone, pin });
		if (!name || !email) {
			return new Response('Missing required fields', { status: 400 });
		}
		// Generate a unique token for the invite link
		const unique_token = randomBytes(16).toString('hex');
		const guest = await prisma.guest.create({
			data: {
				name,
				email,
				phone,
				pin,
				unique_token,
			},
		});

		// console.log('Guest created:', guest);

		return new Response(JSON.stringify(guest), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(error.message, { status: 500 });
	}
}
