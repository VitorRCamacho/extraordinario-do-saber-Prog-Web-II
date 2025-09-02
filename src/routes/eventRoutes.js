const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const eventCtrl = require('../controllers/eventController');
const subCtrl = require('../controllers/subscriptionController');

router.get('/', requireAuth, eventCtrl.list);

router.get('/new', requireAuth, requireAdmin, eventCtrl.newForm);
router.post('/', requireAuth, requireAdmin, eventCtrl.create);

router.get('/:id', requireAuth, eventCtrl.show);

router.get('/:id/edit', requireAuth, requireAdmin, eventCtrl.editForm);
router.put('/:id', requireAuth, requireAdmin, eventCtrl.update);
router.delete('/:id', requireAuth, requireAdmin, eventCtrl.destroy);

router.post('/:id/subscribe', requireAuth, subCtrl.subscribe);
router.post('/:id/unsubscribe', requireAuth, subCtrl.unsubscribe);

module.exports = router;
