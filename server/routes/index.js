var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  setTimeout(() => {
    res.send(500, 'respond with a resource');
  }, 2000)
});

module.exports = router;
