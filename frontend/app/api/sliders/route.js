
import dbConnect from '@/lib/db';
import Slider from '@/lib/models/Slider';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  try {
    const sliders = await Slider.find();
    return new NextResponse(JSON.stringify({ data: sliders }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const slider = new Slider(body);
    const newSlider = await slider.save();
    return new NextResponse(JSON.stringify(newSlider), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 400 });
  }
}
