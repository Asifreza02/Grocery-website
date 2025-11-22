
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

export async function GET(req) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
  try {
    const cartItems = await Cart.find({ user: userId }).populate('product');
    return new NextResponse(JSON.stringify(cartItems), { status: 200 });
  } catch (err) {
    console.error("Get cart error:", err);
    return new NextResponse(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
    await dbConnect();
    const userId = getUserIdFromRequest(req);
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    try {
        const { productId, quantity } = await req.json();

        if (!productId || !quantity) {
            return new NextResponse(JSON.stringify({ message: 'Product ID and quantity are required' }), { status: 400 });
        }

        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ user: userId, product: productId, quantity });
        }

        await cartItem.save();
        return new NextResponse(JSON.stringify(cartItem), { status: 200 });
    } catch (error) {
        console.error("Add to cart error:", error);
        return new NextResponse(JSON.stringify({ message: 'Server error' }), { status: 500 });
    }
}
