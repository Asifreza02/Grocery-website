import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get('category');
    const search = searchParams.get('search');

    let products;
    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (category) {
        products = await Product.find({ category: category._id }).populate('category');
      } else {
        products = [];
      }
    } else if (search) {
      const searchRegex = new RegExp(search, 'i');
      products = await Product.find({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } }
        ]
      }).populate('category');
    } else {
      products = await Product.find().populate('category');
    }
    return NextResponse.json({ data: products });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const product = new Product({
      name: body.name,
      description: body.description,
      mrp: body.mrp,
      sellingPrice: body.sellingPrice,
      category: body.category,
      image: body.image,
      weight: body.weight,
      brand: body.brand,
      rating: body.rating,
      reviewsCount: body.reviewsCount,
      isBestSeller: body.isBestSeller
    });

    const newProduct = await product.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
