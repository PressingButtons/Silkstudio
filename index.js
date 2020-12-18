'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/src', express.static(path.join(__dirname, '/client')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js')));

//routing
const getPage = name => {
  return path.join(__dirname, 'views', name );
}

const routing = {};

routing.home = (req,res) => {
  res.sendFile(getPage('index.html'))
}

routing.html = ( req, res ) => {
  let node = req.url.substring( req.url.lastIndexOf('/') + 1);
  res.sendFile( path.join(__dirname, 'views', node ));
}

app.get('/Silk', routing.home );
app.get('/html/*', routing.html );


const onlisten = err => {
  if( err ) throw err;
  console.log('Server initialized, listening on port', PORT);
}

app.listen( PORT, onlisten );
