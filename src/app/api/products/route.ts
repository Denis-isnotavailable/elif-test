import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const shopId = Number(searchParams.get('shopId'));
    const page = Number(searchParams.get('page')) || 1;
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const category = searchParams.get('category');

    const limit = 6;
    const skip = (page - 1) * limit;    
  
    let orderBy: Prisma.ProductOrderByWithRelationInput = { name: 'asc' };
    if (sortBy === 'price-asc') orderBy = { price: 'asc' };
    if (sortBy === 'price-desc') orderBy = { price: 'desc' };

    const products = await prisma.product.findMany({
        where: {
        shopId,
        ...(category ? { category } : {}),
        },
        orderBy,
        take: limit,
        skip: skip,
    });

    return NextResponse.json(products);
}