import { Schema, model, connect } from 'mongoose';


export async function connectDB(): Promise<void> {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/bibbliotecavr');
}