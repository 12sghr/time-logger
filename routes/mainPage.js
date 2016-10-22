var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('http://localhost:9090/mainPage');
});

router.post('/', (req, res) => {
  res.redirect('http://localhost:9090/mainPage');
});

module.exports = router;
