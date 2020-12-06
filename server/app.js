const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const { getImages, deleteImages, insert } = require('./database/index.js');
const database = require('./database/index.js');

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));
// app.use(express.static(__dirname + '/../client/dist'));
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

app.delete('/api/product/', (req, res) => {
  database.deleteImages((err, response) => {
    if (err) {
      console.log('error deleting', err);
      res.status(404);
      res.end();
    } else {
      console.log('deleting data');
      res.status(200).send(response.rows);
    }
  });
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
  // database.insert((err, response) => {
  //   if(err) {
  //     console.log('error occurred');
  //     console.log('response in error for post request is ', response);
  //     res.status(404).send(err);
  //   } else {
  //     console.log('successful post response is ', response);
  //     console.log('insert operation happened')
  //     res.status(201).send(response.rows);
  //   }
  // });
});

app.put('/api/product', (req, res) => {
  const { productName, images } = req.body;
  const values = [productName, images];
  const sql = 'UPDATE carousel SET ($1, $2)';
  database.connection.client.query(sql, values, (err, response) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200).send(response);
    }
  });
});

module.exports = app;
