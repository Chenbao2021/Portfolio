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

  try {
    const rows = await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erreur INSERT contacts:', err);
    res.status(500).json({ error: 'Impossible de sauvegarder le message.' });
  }
});

// GET /contact — récupère tous les messages enregistrés
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rows = await sql`
      SELECT * FROM contacts ORDER BY created_at DESC
    `;
    res.json(rows);
  } catch (err) {
    console.error('Erreur SELECT contacts:', err);
    res.status(500).json({ error: 'Impossible de récupérer les messages.' });
  }
});

export default router;
