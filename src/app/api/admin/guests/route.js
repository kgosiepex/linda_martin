export async function GET() {
	const prisma = new PrismaClient();
	try {
		const guests = await prisma.guest.findMany({ orderBy: { name: 'asc' } });
		return new Response(JSON.stringify(guests), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response('Error fetching guests', { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
export async function PUT(req) {
	console.log('PUT /api/admin/guests called');
	// console.log(req);
	const prisma = new PrismaClient();
	try {
		const { phone, ...updateData } = await req.json();
		if (!phone) {
			return new Response('Phone number required', { status: 400 });
		}
		let updated;
		try {
			updated = await prisma.guest.update({
				where: { phone },
				data: updateData,
			});
		} catch (err) {
			console.log(err);
			// Prisma throws an error if record not found
			if (err.code === 'P2025') {
				return new Response('Guest not found', { status: 404 });
			}
			console.error('Error updating guest:', err);
			return new Response('Database error', { status: 500 });
		}
		return new Response(JSON.stringify(updated), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log('Error in PUT /api/admin/guests:', error);
		return new Response('Error updating guest', { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function DELETE(req) {
	const prisma = new PrismaClient();
	try {
		const { phone } = await req.json();
		if (!phone) {
			return new Response('Phone number required', { status: 400 });
		}
		await prisma.guest.delete({ where: { phone } });
		return new Response('Guest deleted', { status: 200 });
	} catch (error) {
		return new Response('Error deleting guest', { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function POST(req) {
	const prisma = new PrismaClient();
	try {
		const { phone } = await req.json();
		if (!phone) {
			return new Response('Phone number required', { status: 400 });
		}
		// Use findFirst for non-unique fields in MongoDB
		const guest = await prisma.guest.findFirst({ where: { phone } });
		if (!guest) {
			return new Response('Guest not found', { status: 404 });
		}
		return new Response(JSON.stringify(guest), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response('Error checking guest', { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
