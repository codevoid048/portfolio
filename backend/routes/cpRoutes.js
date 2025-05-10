import express from 'express';
import { getCodingProfileDetails } from '../controllers/profileController.js';

const router = express.Router();

router.get('/profile/:name', getCodingProfileDetails);

export default router;