// routes/pcRoutes.js

const express = require('express');
const Pc = require('../models/Pc');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Check if user is Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'IT_Admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

// Check if user is IT Personnel
const isPersonnel = (req, res, next) => {
  if (req.user.role !== 'IT_Personnel') {
    return res.status(403).json({ message: 'IT Personnel only' });
  }
  next();
};

/**
 * 1️⃣ POST /api/pcs - Create a new PC (Admin or IT_Personnel request)
 */
router.post('/', auth, async (req, res) => {
  try {
    const pcData = req.body;

    const newPc = new Pc({
      ...pcData,
      requestedBy: req.user.userId,
      actionStatus: req.user.role === 'IT_Admin' ? 'Approved' : 'Pending',
      approvedBy: req.user.role === 'IT_Admin' ? req.user.userId : null,
      isDeleteRequest: false
    });

    await newPc.save();

    res.status(201).json({
      message: req.user.role === 'IT_Admin' ? 'PC added successfully' : 'PC request submitted for approval',
      pc: newPc,
    });
  } catch (err) {
    console.error('Error adding PC:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 2️⃣ PUT /api/pcs/:id - Update PC (Admin or IT_Personnel request)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const pc = await Pc.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });

    const updates = req.body;

    // If Admin: Update directly
    if (req.user.role === 'IT_Admin') {
      Object.assign(pc, updates);
      pc.actionStatus = 'Approved';
      pc.approvedBy = req.user.userId;
      pc.isDeleteRequest = false;
    } else {
      // IT_Personnel: Mark as Pending update
      Object.assign(pc, updates);
      pc.actionStatus = 'Pending';
      pc.approvedBy = null;
      pc.requestedBy = req.user.userId;
      pc.isDeleteRequest = false;
    }

    await pc.save();
    res.status(200).json({ message: 'PC updated (or request sent)', pc });
  } catch (err) {
    console.error('Error updating PC:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 3️⃣ DELETE /api/pcs/:id - Delete PC (Admin or IT_Personnel request)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const pc = await Pc.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });

    if (req.user.role === 'IT_Admin') {
      // Admin: delete immediately
      await pc.deleteOne();
      return res.status(200).json({ message: 'PC deleted successfully' });
    } else {
      // IT_Personnel: Mark as Pending Delete
      pc.actionStatus = 'Pending';
      pc.requestedBy = req.user.userId;
      pc.isDeleteRequest = true;
      await pc.save();
      return res.status(200).json({ message: 'Delete request submitted for approval', pc });
    }
  } catch (err) {
    console.error('Error deleting PC:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 4️⃣ GET /api/pcs - Get all PCs
 */
router.get('/', auth, async (req, res) => {
  try {
    const pcs = await Pc.find();
    res.status(200).json(pcs);
  } catch (err) {
    console.error('Error fetching PCs:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 5️⃣ PATCH /api/pcs/:id/approve - Approve a pending PC request (Admin only)
 */
router.patch('/:id/approve', auth, isAdmin, async (req, res) => {
  try {
    const pc = await Pc.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });

    if (pc.actionStatus !== 'Pending') {
      return res.status(400).json({ message: 'This request is not pending' });
    }

    if (pc.isDeleteRequest) {
      // Approve and delete
      await Pc.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'PC deletion approved and completed.' });
    } else {
      // Approve the edit request
      pc.actionStatus = 'Approved';
      pc.approvedBy = req.user.userId;
      await pc.save();
      return res.status(200).json({ message: 'Update request approved.', pc });
    }
  } catch (err) {
    console.error('Error approving request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 6️⃣ PATCH /api/pcs/:id/reject - Reject a pending PC request (Admin only)
 */
router.patch('/:id/reject', auth, isAdmin, async (req, res) => {
  try {
    const pc = await Pc.findById(req.params.id);
    if (!pc) return res.status(404).json({ message: 'PC not found' });

    if (pc.actionStatus !== 'Pending') {
      return res.status(400).json({ message: 'This request is not pending' });
    }

    // Reject request: reset delete flag if any
    pc.actionStatus = 'Rejected';
    pc.isDeleteRequest = false;
    pc.approvedBy = req.user.userId;
    await pc.save();

    res.status(200).json({ message: 'Request rejected', pc });
  } catch (err) {
    console.error('Error rejecting request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 7️⃣ POST /api/pcs/request-edit - IT Personnel request to edit a PC (by pc_id)
 */
router.post('/request-edit', auth, async (req, res) => {
  try {
    const { pc_id, ...updates } = req.body;
    const pc = await Pc.findOne({ pc_id: Number(pc_id) });
    if (!pc) return res.status(404).json({ message: 'PC not found' });

    // Mark as pending edit request
    Object.assign(pc, updates);
    pc.actionStatus = 'Pending';
    pc.approvedBy = null;
    pc.requestedBy = req.user.userId;
    pc.isDeleteRequest = false;

    await pc.save();
    res.status(200).json({ message: 'Edit request submitted for approval', pc });
  } catch (err) {
    console.error('Error submitting edit request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
