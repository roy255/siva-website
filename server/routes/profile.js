import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Middleware to verify token (Simple version)
import jwt from 'jsonwebtoken';
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Save or Update Profile
router.post('/', authenticate, async (req, res) => {
  const {
    name,
    phone,
    age,
    purpose,
    gender,
    height,
    weight,
    healthChallenges,
    medicalHistory,
    lifestyle,
    additionalNotes
  } = req.body;

  try {
    // Check if profile exists
    const [existing] = await query('SELECT id FROM profiles WHERE user_id = ?', [req.user.id]);
    
    if (existing.length > 0) {
      // Update
      await query(`
        UPDATE profiles SET
          name = ?, phone = ?, age = ?, purpose = ?, gender = ?,
          height = ?, weight = ?, health_challenges = ?, medical_history = ?,
          lifestyle = ?, additional_notes = ?
        WHERE user_id = ?
      `, [
        name, phone, age, purpose, gender, height, weight, 
        JSON.stringify(healthChallenges), medicalHistory, lifestyle, additionalNotes,
        req.user.id
      ]);
    } else {
      // Insert
      await query(`
        INSERT INTO profiles (
          user_id, name, phone, age, purpose, gender, height, weight,
          health_challenges, medical_history, lifestyle, additional_notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        req.user.id, name, phone, age, purpose, gender, height, weight,
        JSON.stringify(healthChallenges), medicalHistory, lifestyle, additionalNotes
      ]);
    }
    
    res.status(200).json({ success: true, message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Profile save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Profile
router.get('/', authenticate, async (req, res) => {
  try {
    const [profiles] = await query('SELECT * FROM profiles WHERE user_id = ?', [req.user.id]);
    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profiles[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
