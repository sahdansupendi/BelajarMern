const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/participants', index);
router.get('/participants/:id', find);
router.put('/participants/:id', update);
router.delete('/participants/:id', destroy);

router.post('/participants', create);

module.exports = router;