
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 400 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return new NextResponse(JSON.stringify({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    }), { status: 200 });
  } catch (err) {
    console.error(err.message);
    return new NextResponse(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
