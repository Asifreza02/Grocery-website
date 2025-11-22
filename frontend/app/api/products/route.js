
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import Category from '@/lib/models/Category';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const categoryName = url.searchParams.get('category');

    let products;
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (category) {
        products = await Product.find({ category: category._id }).populate('category');
      } else {
        products = [];
      }
    } else {
      products = await Product.find().populate('category');
    }

    return new NextResponse(JSON.stringify({ data: products }), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const product = new Product(body);
    const newProduct = await product.save();
    return new NextResponse(JSON.stringify(newProduct), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err.message }), { status: 400 });
  }
}
