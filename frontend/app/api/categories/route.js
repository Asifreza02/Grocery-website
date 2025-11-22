
import dbConnect from '@/lib/db';
import Category from '@/lib/models/Category';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  try {
    const categories = await Category.find();
    return new NextResponse(JSON.stringify({ data: categories }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const category = new Category(body);
    const newCategory = await category.save();
    return new NextResponse(JSON.stringify(newCategory), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 400 });
  }
}
