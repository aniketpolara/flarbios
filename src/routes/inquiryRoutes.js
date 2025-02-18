import express from 'express';
import {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry
} from '../controllers/inquiryController.js';

const router = express.Router();

router.route('/')
  .get(getInquiries)
  .post(createInquiry);

router.route('/:id')
  .get(getInquiryById)
  .put(updateInquiry)
  .delete(deleteInquiry);

export default router;