import express from 'express';
import detectAI from '../controllers/detectAIController.js';
import detectAI_ImageController from '../controllers/detectAI_ImageController.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Rotas para detecção de conteúdo gerado por IA
 */

/**
 * @swagger
 * /detect-ai:
 *   post:
 *     summary: Detecta se um texto foi gerado por IA
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texto que será analisado
 *                 example: "A inteligência artificial está mudando o mundo."
 *     responses:
 *       200:
 *         description: Resultado da análise de IA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likelihood:
 *                   type: string
 *                   description: Probabilidade de ser gerado por IA
 *                   example: "AI-generated"
 *                 confidence:
 *                   type: number
 *                   description: Confiança do resultado
 *                   example: 0.93
 *                 provider:
 *                   type: string
 *                   description: Serviço usado para análise
 *                   example: "huggingface"
 *                 raw:
 *                   type: array
 *                   description: Detalhes brutos da análise
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "AI-generated"
 *                       score:
 *                         type: number
 *                         example: 0.929
 *       400:
 *         description: Texto inválido ou não enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "InvalidText"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/detect-ai", detectAI);

router.post("/detect-ai-image", uploadImage.single("image"), detectAI_ImageController);

export default router;