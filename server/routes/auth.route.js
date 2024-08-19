import express from 'express';
import { google } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/google", google);

export default router;