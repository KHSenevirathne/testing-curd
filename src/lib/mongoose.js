// lib/mongoose.js
import mongoose from 'mongoose';

let isConnected = false; // Track connection status

export async function connectDB() {
  if (isConnected) {
    // Already connected, no need to reconnect
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
