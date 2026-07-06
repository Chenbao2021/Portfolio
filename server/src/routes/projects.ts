import { Router, Request, Response } from 'express';
import sql from '../db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const rows = await sql`SELECT * FROM projects ORDER BY sort_order ASC`;
    res.json(rows);
  } catch (err) {
    console.error('Erreur SELECT projects:', err);
    res.status(500).json({ error: 'Impossible de récupérer les projets.' });
  }
});

export default router;
