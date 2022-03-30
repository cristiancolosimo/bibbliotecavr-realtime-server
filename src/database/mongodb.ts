import { Schema, model, connect } from 'mongoose';


export async function connectDB(): Promise<void> {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/bibbliotecavr');
}