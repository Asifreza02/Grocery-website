import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const decoded = getUserIdFromRequest(req);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { phone, address, city, state, zip } = body;

        const user = await User.findByIdAndUpdate(
            decoded.id,
            { phone, address, city, state, zip },
            { new: true }
        ).select('-password');

        return NextResponse.json(user);
    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
