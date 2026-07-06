import { Router, Request, Response } from 'express';
import { Resend } from 'resend';
import sql from '../db';

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /contact — reçoit un message du formulaire et le sauvegarde en DB
router.post('/', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'name, email et message sont requis' });
    return;
  }

  if (name.length > 100) {
    res.status(400).json({ error: 'Le nom ne peut pas dépasser 100 caractères' });
    return;
  }

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    res.status(400).json({ error: 'Adresse email invalide' });
    return;
  }

  if (message.length > 2000) {
    res.status(400).json({ error: 'Le message ne peut pas dépasser 2000 caractères' });
    return;
  }

  try {
    const rows = await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING *
    `;
    const contact = rows[0];

    resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'yuchenbao2015@gmail.com',
      subject: `Nouveau message de ${contact.name}`,
      html: `
        <p><strong>Nom :</strong> ${contact.name}</p>
        <p><strong>Email :</strong> ${contact.email}</p>
        <p><strong>Message :</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
      `,
    }).then((result) => console.log('Email envoyé:', result))
      .catch((err) => console.error('Erreur envoi email:', err));

    res.status(201).json(contact);
  } catch (err) {
    console.error('Erreur INSERT contacts:', err);
    res.status(500).json({ error: 'Impossible de sauvegarder le message.' });
  }
});

// GET /contact — protégé par clé admin, non accessible publiquement
router.get('/', (req: Request, res: Response, next) => {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: 'Non autorisé' });
    return;
  }
  next();
}, async (_req: Request, res: Response) => {
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
