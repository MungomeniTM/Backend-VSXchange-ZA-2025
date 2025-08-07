const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/dashboard', authenticateUser, (req, res) => {
  res.json({ message: 'Welcome to the dashboard' });
});

module.exports = router;
