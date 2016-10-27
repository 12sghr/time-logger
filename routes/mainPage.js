var express = require('express');
var http = require('http');
var request = require('request');

var router = express.Router();

var workingTaskId;

router.get('/', (req, res) => {
  var url = 'http://localhost:9090/mainPage';
  (() => {
    var promise = new Promise((resolve) => {
      http.get(url, function(res){
        var body = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(res){
          ret = JSON.parse(body);
          //console.log(ret);
          result = ret;
          //console.log(result);
          resolve(result);
        });
      }).on('error', function(e){
        console.log(e.message); //エラー時
      });
    });
    return promise;
  })().then((result) => {
    console.log(result);
    var isEnd;
    if(result !== null){
      if(result[0].end == 0){
        isEnd = false;
        workingTaskId = result[0].taskId;
      } else {
        isEnd = true;
      }
    }
    res.render('mainPage.ejs', {
      result,
      isEnd,
    });
  });
});

router.post('/', (req, res) => {
  var options = {
    uri: 'http://localhost:9090/mainPage',
    form: { doing_thing: req.body.doing_thing },
    json: true
  };
  request.post(options, (error, response, body) => {
    //console.log(response.body.title);
    res.redirect('/mainPage');
  });
});

router.post('/end', (req, res) => {
  var options = {
    uri: 'http://localhost:9090/mainPage/end',
    form: { task_id: workingTaskId }
  }
  request.post(options, (error, response, body) => {
    res.redirect('/mainPage')
  });
});

module.exports = router;
