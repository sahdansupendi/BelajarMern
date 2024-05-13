const express = require('express');
const router = express();
const{ index, find } = require('./controller');

router.get('/order',index);
router.get('/order/:id',find);


module.exports = router;