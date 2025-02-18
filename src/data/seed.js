import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/categoryModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const categories = [
  {
    name: "ANTI FUNGAL & SCABIES RANGE",
    products: [
      {
        name: "Flozale 100/200",
        description: "Itraconazole 100/200mg (10 Caps)"
      },
    ]
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();