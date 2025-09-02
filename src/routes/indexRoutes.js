const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const subCtrl = require('../controllers/subscriptionController');

router.get('/', (req, res) => {
  if (!req.session.userId) return res.redirect('/auth/login');
  res.render('home', { title: 'Início' });
});

router.get('/my', requireAuth, subCtrl.myArea);

module.exports = router;