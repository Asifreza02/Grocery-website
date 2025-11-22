
import dbConnect from '@/lib/db';
import Cart from '@/lib/models/Cart';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const getUserIdFromRequest = (req) => {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.id;
        } catch (error) {
            return null;
        }
    }
    return null;
}

export async function PUT(req, { params }) {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const cartItemId = params.id;
    const { quantity } = await req.json();

    if (!quantity || quantity < 1) {
        return new NextResponse(JSON.stringify({ message: "Quantity must be at least 1" }), { status: 400 });
    }

    try {
        const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });
        if (!cartItem) return new NextResponse(JSON.stringify({ message: "Cart item not found" }), { status: 404 });

        cartItem.quantity = quantity;
        await cartItem.save();

        return new NextResponse(JSON.stringify({ message: "Quantity updated", item: cartItem }), { status: 200 });
    } catch (err) {
        console.error("Error updating cart item quantity:", err);
        return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    const cartItemId = params.id;

    try {
        const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });
        if (!cartItem) {
            return new NextResponse(JSON.stringify({ message: "Cart item not found" }), { status: 404 });
        }

        await Cart.deleteOne({ _id: cartItemId });

        return new NextResponse(JSON.stringify({ message: "Item removed from cart" }), { status: 200 });
    } catch (err) {
        console.error("Error removing cart item:", err);
        return new NextResponse(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
