import express from 'express';
import detectAI from '../controllers/detectAIController.js';

const router = express.Router();

router.post("/detect-ai", detectAI);

export default router;