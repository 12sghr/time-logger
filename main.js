'use strict';

var electron = require('electron');
var express = require('express');
var exapp = express();
var eleapp = electron.app;
var BrowserWindow = electron.BrowserWindow;
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

var mainPage = require('./routes/mainPage');

exapp.set('views', path.join(__dirname + '/view'));
exapp.set('view engine', 'ejs');

exapp.use(bodyParser.json());
exapp.use(bodyParser.urlencoded({ extended : true }));
exapp.use(logger('dev'));
exapp.use(express.static(__dirname + '/view'));
exapp.use(express.static(path.join(__dirname, 'public')));

exapp.use('/mainPage', mainPage);

exapp.listen(3000);
console.log('server starting...');

var mainWindow = null;

eleapp.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    eleapp.quit();
});

eleapp.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
        "width": 500,
        "height": 600,
        // "transparent": true,    // ウィンドウの背景を透過
        // "frame": false,     // 枠の無いウィンドウ
        "resizable": false,  // ウィンドウのリサイズを禁止
        // "show": false,         // アプリ起動時にウィンドウを表示しない
        // "skip-taskbar": true,   // タスクバーに表示しない
  });
  mainWindow.loadURL('http://localhost:3000/mainPage');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});
