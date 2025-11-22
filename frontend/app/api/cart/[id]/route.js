import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';
import { getUserIdFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;
        const { id } = await params;
        const { quantity } = await req.json();

        if (!quantity || quantity < 1) {
            return NextResponse.json({ message: "Quantity must be at least 1" }, { status: 400 });
        }

        const cartItem = await Cart.findOne({ _id: id, user: userId });
        if (!cartItem) return NextResponse.json({ message: "Cart item not found" }, { status: 404 });

        cartItem.quantity = quantity;
        await cartItem.save();

        return NextResponse.json({ message: "Quantity updated", item: cartItem });
    } catch (err) {
        console.error("Error updating cart item quantity:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;
        const { id } = await params;

        const cartItem = await Cart.findOne({ _id: id, user: userId });
        if (!cartItem) {
            return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
        }

        await Cart.deleteOne({ _id: id });

        return NextResponse.json({ message: "Item removed from cart" });
    } catch (err) {
        console.error("Error removing cart item:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
