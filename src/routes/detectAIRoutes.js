import express from 'express';

import detectAI from '../controllers/detectAIController.js';
import detectAI_ImageController from '../controllers/detectAI_ImageController.js';
import detectAIArchiveController from '../controllers/detectAIArchiveController.js';

import { uploadImage } from '../middleware/uploadImage.js';
import { uploadArchive } from '../middleware/uploadArchive.js';
import { checkFile } from '../middleware/checkFile.js';
import { checkImage } from '../middleware/checkImage.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Rotas para detecção de conteúdo gerado por IA
 */

/**
 * @swagger
 * /detect-ai-text:
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
router.post("/detect-ai-text", detectAI);


/**
 * @swagger
 * /detect-ai-image:
 *   post:
 *     summary: Detecta se uma imagem contém conteúdo gerado por IA
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem que será analisada
 *     responses:
 *       200:
 *         description: Resultado da análise de IA para a imagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likelihood:
 *                   type: string
 *                   description: Probabilidade de a imagem ter sido gerada por IA
 *                   example: "AI-generated"
 *                 confidence:
 *                   type: number
 *                   description: Confiança do resultado
 *                   example: 0.91
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
 *                         example: 0.91
 *       400:
 *         description: Arquivo inválido ou não enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "InvalidImage"
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
router.post("/detect-ai-image", uploadImage.single("image"), checkImage, detectAI_ImageController);

/**
 * @swagger
 * /detect-ai-archive:
 *   post:
 *     summary: Detecta se um documento (PDF ou Word) contém conteúdo gerado por IA
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Documento PDF ou Word que será analisado
 *     responses:
 *       200:
 *         description: Resultado da análise de IA para o documento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likelihood:
 *                   type: string
 *                   description: Probabilidade de o texto ter sido gerado por IA
 *                   example: "AI-generated"
 *                 confidence:
 *                   type: number
 *                   description: Confiança do resultado
 *                   example: 0.92
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
 *                         example: 0.92
 *       400:
 *         description: Arquivo inválido ou não enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "InvalidDocument"
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

router.post("/detect-ai-archive", uploadArchive.single("file"), checkFile, detectAIArchiveController);

export default router;