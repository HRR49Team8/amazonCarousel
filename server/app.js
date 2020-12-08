const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database/index.js');

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/product/:id', (req, res) => {
  const { id } = req.params;
  database.getImages((err, response) => {
    if (err) {
      console.log('error', err);
      res.status(404);
      res.end();
    } else {
      console.log('getting data');
      res.status(201).send(response.rows);
    }
  }, id);
});

app.delete('/api/product/:id', (req, res) => {
  const { id } = req.params;
  database.deleteImages((err, response) => {
    if (err) {
      console.log('error deleting', err);
      res.status(404);
      res.end();
    } else {
      console.log('deleting data');
      res.status(200).send(response.rows);
    }
  }, id);
});

app.post('/api/product/', async (req, res) => {
  let response;
  try {
    response = await database.insert();
  } catch (e) {
    res.status(500).send(e);
  }
  console.log(response);
  res.status(200).send(response);
});

app.put('/api/product/:id', (req, res) => {
  const { id } = req.params;
  database.update((err, response) => {
    if (err) {
      console.log('error with put request ', err);
      res.status(404).send(err);
      res.end();
    } else {
      console.log('updating data ', response);
      res.status(200).send(response.rows);
    }
  }, id);
});

module.exports = app;
