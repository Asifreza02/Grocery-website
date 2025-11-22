import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Slider from '@/models/Slider';

export async function GET() {
    try {
        await dbConnect();
        const sliders = await Slider.find();
        return NextResponse.json({ data: sliders });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
