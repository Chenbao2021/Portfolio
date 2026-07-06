import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from './db';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// Middleware — parse le JSON et autorise les requêtes depuis le frontend React
app.use(cors());
app.use(express.json());

// Routes
app.use('/contact', contactRouter);

// Route de test pour vérifier que le serveur tourne
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  // Crée la table contacts si elle n'existe pas encore
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      message    TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

start();
