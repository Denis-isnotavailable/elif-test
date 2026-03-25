import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const orders = await prisma.order.findMany({
        where: {
            email: email,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}