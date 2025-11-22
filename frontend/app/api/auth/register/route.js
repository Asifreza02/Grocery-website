import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    // check if fields are missing
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    return NextResponse.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    }, { status: 201 });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
