import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;
        const body = await req.json();
        const { items, totalAmount, address } = body;

        const newOrder = new Order({
            user: userId,
            items,
            totalAmount,
            address,
            status: 'Pending'
        });

        await newOrder.save();

        // Clear cart after successful order
        await Cart.deleteMany({ user: userId });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Create order error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;

        const orders = await Order.find({ user: userId })
            .populate('items.product')
            .sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Get orders error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
