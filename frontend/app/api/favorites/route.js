import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Wishlist from '@/models/Wishlist';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;

        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        return NextResponse.json(wishlist ? wishlist.products : []);
    } catch (error) {
        console.error("Get wishlist error:", error);
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
        const { productId } = await req.json();

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();
        return NextResponse.json({ message: 'Added to wishlist' });
    } catch (error) {
        console.error("Add to wishlist error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const userId = decoded.id;
        const { productId } = await req.json();

        const wishlist = await Wishlist.findOne({ user: userId });
        if (wishlist) {
            wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
            await wishlist.save();
        }

        return NextResponse.json({ message: 'Removed from wishlist' });
    } catch (error) {
        console.error("Remove from wishlist error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
