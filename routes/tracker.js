var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('tracker', { title: 'GrassChain'});
});

module.exports = router;