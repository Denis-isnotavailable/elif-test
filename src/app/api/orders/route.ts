import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, address, items, totalPrice } = body;

        if (!name || !email || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields or cart is empty' },
                { status: 400 }
            );
        }

        const newOrder = await prisma.order.create({
            data: {
                name,
                email,
                phone,
                address,
                totalPrice: Math.round(totalPrice),
                items: {
                    create: items.map((item: Prisma.OrderItemUncheckedCreateWithoutOrderInput) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        priceAtPurchase: item.priceAtPurchase,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json(
            { message: 'Order created successfully', orderId: newOrder.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Order Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}