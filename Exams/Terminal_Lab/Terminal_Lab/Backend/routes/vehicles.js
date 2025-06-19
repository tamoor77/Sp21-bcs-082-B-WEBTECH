import express from 'express';
const router = express.Router();

import Vehicle from '../models/Vehicle.js';
import upload from './../middleware/upload.js';

// ✅
router.use((req, res, next) => {
  req.user = { isAdmin: true }; // Simulate logged-in admin
  next();
});

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) return next();
  res.redirect('/login');
}
/* ✅ Admin auth check
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ error: 'Access denied' });
}*/

// ✅ GET /vehicles - Public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// ✅ GET /vehicles/admin - Admin view
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// ✅ POST /vehicles/admin - Create Vehicle
router.post('/admin', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, type } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!name || !brand || !price || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const vehicle = await Vehicle.create({ name, brand, price, type, image });
    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during vehicle creation' });
  }
});

// ✅ GET /vehicles/admin/edit/:id - Get vehicle for editing
router.get('/admin/edit/:id', isAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

// ✅ POST /vehicles/admin/edit/:id - Update vehicle
router.post('/admin/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, type } = req.body;
    const updated = { name, brand, price, type };
    if (req.file) updated.image = req.file.filename;

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, updated, { new: true });
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.json({ message: 'Vehicle updated', vehicle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
});

// ✅ POST /vehicles/admin/delete/:id - Delete vehicle
router.post('/admin/delete/:id', isAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

export default router;
