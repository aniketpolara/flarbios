import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: [productSchema]
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;