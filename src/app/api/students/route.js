// app/api/students/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Student from '@/models/Student';

// 1) GET => Search student by name
export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  try {
    if (name) {
      // Fetch a specific student if name is provided
      const student = await Student.findOne({ name });
      if (!student) {
        return NextResponse.json(
          { message: 'Student not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ student }, { status: 200 });
    } else {
      // No name provided, so return all students
      const students = await Student.find({});
      return NextResponse.json({ students }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// 2) POST => Add a new student
export async function POST(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { name, address, grade } = body;

    // Check if all fields are provided
    if (!name || !address || !grade) {
      return NextResponse.json(
        { message: 'Please provide name, address, and grade' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ name });
    if (existingStudent) {
      return NextResponse.json(
        { message: 'Student with this name already exists' },
        { status: 400 }
      );
    }

    // Create and save new student
    const newStudent = new Student({ name, address, grade });
    await newStudent.save();

    return NextResponse.json(
      { message: 'Student added successfully', student: newStudent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// 3) PUT => Update an existing student
export async function PUT(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { name, address, grade } = body;

    // Check if all fields are provided
    if (!name || !address || !grade) {
      return NextResponse.json(
        { message: 'Please provide name, address, and grade' },
        { status: 400 }
      );
    }

    // Find and update the student
    const student = await Student.findOneAndUpdate(
      { name },
      { address, grade },
      { new: true }
    );

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Student updated successfully', student },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// 4) DELETE => Delete an existing student
export async function DELETE(request) {
  await connectDB();

  try {
    const body = await request.json();
    const { name } = body;

    // Check if name is provided
    if (!name) {
      return NextResponse.json(
        { message: 'Please provide name' },
        { status: 400 }
      );
    }

    // Find and delete the student
    const student = await Student.findOneAndDelete({ name });

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Student deleted successfully', student },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// 5) GETALL => Get all students
export async function GETALL() {
  await connectDB();

  try {
    const students = await Student.find();
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
