import express from 'express';
import { Spot } from '../../models/Spot';

const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.find().sort('-createdAt');
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spots' });
  }
});

// Get spot by ID
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }
    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spot' });
  }
});

// Create new spot
router.post('/', async (req, res) => {
  try {
    const spot = await Spot.create(req.body);
    res.status(201).json(spot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create spot' });
  }
});

// Update spot
router.put('/:id', async (req, res) => {
  try {
    const spot = await Spot.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update spot' });
  }
});

export default router;