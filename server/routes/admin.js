import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.get('/profiles', async (req, res) => {
  try {
    const [profiles] = await query(`
      SELECT p.*, u.email 
      FROM profiles p 
      JOIN users u ON p.user_id = u.id
    `);
    res.json(profiles);
  } catch (error) {
    console.error('Admin fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
