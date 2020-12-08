const { client } = require('./config.js');

const getImages = (callback, id) => {
  const query = {
    name: 'tech id',
    text: 'SELECT * FROM imagess WHERE id = $1',
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

const deleteImages = (callback, id) => {
  const query = {
    name: 'id',
    text: 'DELETE FROM imagess WHERE id = $1',
    values: [id],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    console.log('deleting images from database');
    callback(null, response);
  });
};

const insert = async () => {
  const sql = 'INSERT INTO imagess(images) VALUES (ARRAY [$1])';
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

const update = (callback, id) => {
  const query = {
    name: 'right',
    text: "UPDATE imagess SET images = ARRAY['what once was is no longer'] WHERE id = $1",
    values: [id],
  };

  client.query(query, (err, response) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    console.log('updating item ');
    callback(null, response);
  });
};

module.exports = {
  getImages,
  deleteImages,
  insert,
  update,
};
