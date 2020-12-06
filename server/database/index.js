const { client } = require('./config.js');

const getImages = (callback, id) => {
  const query = {
    name: 'tech id',
    text: 'SELECT * FROM carousel WHERE id = $1',
    values: [id],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.log('error processing your request ', err);
      callback(err, null);
      return;
    }
    callback(null, response);
  });
};

const deleteImages = (callback) => {
  const sql = 'DELETE * FROM carousel';
  client.query(sql, (err, response) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    console.log('deleting images from database');
    return callback(null, response);
  });
};

const insert = async () => {
  const sql = 'INSERT INTO carousel(productName) VALUES ($1)';
  const toInsert = ['random chicken'];
  let response;
  try {
    response = await client.query(sql, toInsert);
  } catch (e) {
    console.error(e);
    throw (e);
  }
  return response;
};

module.exports = {
  getImages,
  deleteImages,
  insert,
};
