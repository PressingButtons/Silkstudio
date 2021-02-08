'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.port || 3000;

app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/src', express.static(path.join(__dirname, '/client')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js')));
app.use('/handlebars', express.static(path.join(__dirname, 'node_modules', 'handlebars', 'dist', 'handlebars.js')));
//app.use('/silk', express.static(path.join(__dirname, 'server', 'silk.lib.js')));

app.get('/', (req, res, next) => {
  res.redirect('/Silk');
})

app.get('/hbs/*', (req, res, next) => {
  let view = req.url.substring( req.url.lastIndexOf('/') + 1 );
  res.sendFile( path.join(__dirname, '/views/'  + view  ));
})

app.get('/Silk', (req, res, next ) => {
  res.render('silk', {
    layout: 'main'
  })
});

app.get('/Silk/tiles', (req,res,next) => {
  res.render('tile', {
    layout: 'main',
  })
})


const onlisten = err => {
  if( err ) throw err;
  console.log('Server initialized, listening on port', PORT);
}

app.listen( PORT, onlisten );
