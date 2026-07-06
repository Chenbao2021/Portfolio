import { Router, Request, Response } from 'express';
import sql from '../db';

const router = Router();

// POST /contact — reçoit un message du formulaire et le sauvegarde en DB
router.post('/', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'name, email et message sont requis' });
    return;
  }

  const rows = await sql`
    INSERT INTO contacts (name, email, message)
    VALUES (${name}, ${email}, ${message})
    RETURNING *
  `;

  res.status(201).json(rows[0]);
});

// GET /contact/test — insère un message fictif pour tester la DB
router.get('/test', async (_req: Request, res: Response) => {
  const rows = await sql`
    INSERT INTO contacts (name, email, message)
    VALUES ('Test User', 'test@test.com', 'Ceci est un message de test')
    RETURNING *
  `;

  res.json({ message: 'Test OK — enregistré en DB', data: rows[0] });
});

// GET /contact — récupère tous les messages enregistrés
router.get('/', async (_req: Request, res: Response) => {
  const rows = await sql`
    SELECT * FROM contacts ORDER BY created_at DESC
  `;

  res.json(rows);
});

export default router;
