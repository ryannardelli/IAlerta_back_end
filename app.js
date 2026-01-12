import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import detectAIRoutes from './src/routes/detectAIRoutes.js';
import { swaggerUi, swaggerSpec } from "./src/config/swagger.js";
import { handleError } from './src/middleware/handleError.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", detectAIRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(handleError);

export default app;
