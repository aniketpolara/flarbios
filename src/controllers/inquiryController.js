import asyncHandler from 'express-async-handler';
import Inquiry from '../models/inquiryModel.js';

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public
export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find();
  res.json(inquiries);
});

// @desc    Get a single inquiry
// @route   GET /api/inquiries/:id
// @access  Public
export const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    res.status(404);
    throw new Error('Inquiry not found');
  }
  res.json(inquiry);
});

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = asyncHandler(async (req, res) => {
  const { name, clinic_name, email, phone, message } = req.body;
  if (!name || !clinic_name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  const inquiry = await Inquiry.create({
    name,
    clinic_name,
    email,
    phone,
    message
  });
  res.status(201).json(inquiry);
});

// @desc    Update an inquiry
// @route   PUT /api/inquiries/:id
// @access  Public
export const updateInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    res.status(404);
    throw new Error('Inquiry not found');
  }
  const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(updatedInquiry);
});

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Public
export const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    res.status(404);
    throw new Error('Inquiry not found');
  }
  await inquiry.remove();
  res.json({ message: 'Inquiry deleted successfully' });
});