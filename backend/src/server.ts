import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, () => {
  console.log(`Velmoria API in esecuzione su http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
