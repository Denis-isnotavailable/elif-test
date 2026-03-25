import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const coupones = await prisma.coupon.findMany();

        return NextResponse.json(coupones);
    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }  
}