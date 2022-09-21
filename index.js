'use strict';
import express from 'express';
import {create} from 'express-handlebars';
import * as path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;

const app = express( );
const hbs = create({
  extname: '.hbs'
});

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));


//routing
app.get('/', (req, res) => {
  res.redirect('/home');
})

app.get('/home', (req, res) => {
  res.render('home', {source: null});
})

app.get('/tile', (req, res) => {
  res.render('tile', {source: '/public/js/tile/main.js'});
});

app.get('/sprite', (req, res) => {
  res.render('sprite', {source: '/public/js/sprite/main.js'});
});

app.get('/*', (req, res) => {
  res.status(404).render('404', {source: null});
});

const onlisten = err => {
  if( err ) throw err;
  console.log('Server initialized, listening on port', port);
}

app.listen(port, onlisten );
