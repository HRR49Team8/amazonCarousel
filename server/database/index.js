const { client } = require('./config.js');

const getImages = (callback, id) => {
  const query = {
    name: 'tech id',
    text: 'SELECT i.*, c.productName FROM imagess i INNER JOIN carousel c ON c.id = i.id WHERE c.id = $1',
    // text: 'SELECT * FROM JOINED WHERE id = $1',
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

const insertImage = (callback, image) => {
  const sql = {
    name: 'an image',
    text: 'INSERT INTO imagess(images) VALUES (ARRAY [$1]);',
    values: [image],
  };
  client.query(sql, (err, response) => {
    if (err) {
      console.log('error, ', err);
      callback(err, null);
      return;
    }
    callback(null, response);
  });
};

const insertProd = (callback, productName) => {
  const sql = {
    name: 'some value',
    text: "INSERT INTO carousel(productname) VALUES($1)",
    values: [productName],
  };
  // const sql = 'INSERT INTO carousel(productname) VALUES($1)';
  client.query(sql, (err, response) => {
    if (err) {
      console.log('err ', err);
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
    // text: 'DELETE FROM joined WHERE id = $1',
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

// const insert = async () => {
//   const sql = 'INSERT INTO imagess(images) VALUES (ARRAY [$1])';
//   const toInsert = ['random chicken'];
//   let response;
//   try {
//     response = await client.query(sql, toInsert);
//   } catch (e) {
//     console.error(e);
//     throw (e);
//   }
//   return response;
// };
const insert = (callback, id) => {
  const query = {
    name: 'post',
    text: 'INSERT INTO joined(images, productName) VALUES (ARRAY[$1], $1) returning *',
    values: [id],
  };
  client.query(query, (err, response) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    console.log('adding item ');
    callback(null, response);
  });
};

const update = (callback, id) => {
  const query = {
    name: 'right',
    text: "UPDATE imagess SET images = ARRAY['what once was is no longer'] WHERE id = $1",
    // text: "UPDATE joined SET images=ARRAY['what once was is no longer'], productName='big penny nug' WHERE id = $1",
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
  insertProd,
  insertImage,
};
