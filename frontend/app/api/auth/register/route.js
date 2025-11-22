
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User with this email already exists' }), { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    return new NextResponse(JSON.stringify({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    }), { status: 201 });
  } catch (err) {
    console.error(err.message);
    return new NextResponse(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
