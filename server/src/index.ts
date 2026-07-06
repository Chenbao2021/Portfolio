import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import sql from "./db";
import contactRouter from "./routes/contact";
import projectsRouter from "./routes/projects";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// CORS restreint — seul le frontend autorisé peut appeler l'API
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// Rate limiting — max 5 requêtes par IP toutes les 15 minutes sur /contact
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Trop de messages envoyés. Réessaie dans 15 minutes." },
});
app.use("/contact", contactLimiter, contactRouter);
app.use("/projects", projectsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Gestionnaire d'erreurs global
// Les 4 paramètres sont obligatoires pour qu'Express reconnaisse ce middleware comme gestionnaire d'erreurs
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Erreur non gérée:", err);
  res.status(500).json({ error: "Une erreur inattendue est survenue." });
});

async function start() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        message    TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id           SERIAL PRIMARY KEY,
        key          TEXT NOT NULL UNIQUE,
        name         TEXT NOT NULL,
        tech         TEXT[] NOT NULL DEFAULT '{}',
        role         TEXT NOT NULL,
        github       TEXT,
        demo         TEXT,
        color_key    TEXT NOT NULL,
        emoji        TEXT NOT NULL,
        professional BOOLEAN NOT NULL DEFAULT false,
        sort_order   INTEGER NOT NULL DEFAULT 0
      )
    `;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Échec du démarrage du serveur:", err);
    process.exit(1);
  }
}

start();
