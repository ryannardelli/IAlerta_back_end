import app from './app.js';
import { PORT } from './src/config/secretKeys/index.js';

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});