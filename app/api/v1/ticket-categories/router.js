const express = require('express');
const router = express();
const { create, index, update, destroy, find } = require('./controller');

router.get('/tickets-categories', index);
router.get('/tickets-categories/:id', find);
router.put('/tickets-categories/:id', update);
router.delete('/tickets-categories/:id', destroy);

router.post('/tickets-categories', create);

module.exports = router;
