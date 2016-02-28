var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.hmr');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('dist'));

app.get('/config.local.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'config.local.js'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.local.html'));
});

app.listen(8000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8000');
});
