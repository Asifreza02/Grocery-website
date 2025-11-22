import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;

        const cartItems = await Cart.find({ user: userId }).populate('product');
        return NextResponse.json(cartItems);
    } catch (err) {
        console.error("Get cart error:", err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;

        const { productId, quantity } = await req.json();

        if (!productId || !quantity) {
            return NextResponse.json({ message: 'Product ID and quantity are required' }, { status: 400 });
        }

        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ user: userId, product: productId, quantity });
        }

        await cartItem.save();
        return NextResponse.json(cartItem);
    } catch (error) {
        console.error("Add to cart error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
