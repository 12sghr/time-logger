var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('mainPage.ejs');
});

router.post('/', (req, res) => {
  var options = {
    uri: 'http://localhost:9090/mainPage',
    form: { doing_thing: req.body.doing_thing },
    json: true
  };
  request.post(options, (error, response, body) => {
    console.log(response.body.title);
  });
});

module.exports = router;
