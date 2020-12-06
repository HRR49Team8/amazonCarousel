const faker = require('faker');
const fs = require('fs');
const connections = require('./index.js');
const config = require('./config.js');
const csvdir = './server/csv/';

const getImages = () => {
  // var randomLEN = Math.floor(Math.random() * Math.floor(7)) + 1
  // var imageArray = [];
  // for (var j = 0; j < randomLEN; j++) {
  //   var randomIMG = Math.floor(Math.random() * Math.floor(50))
  //   imageArray.push(`https://zainfecservice.s3.amazonaws.com/Random+Images/${randomIMG}.jpg`)
  // }
  var randomLEN = Math.floor(Math.random() * Math.floor(7)) + 1
  var imageArray = {};
  for (var j = 0; j < randomLEN; j++) {
    var randomIMG = Math.floor(Math.random() * Math.floor(50))
    imageArray[j] = (`https://zainfecservice.s3.amazonaws.com/Random+Images/${randomIMG}.jpg`)
  }
  return JSON.stringify(imageArray) + '\n';
}

// var lines = 10000000;
var lines = 10;
console.log(`Sending ${lines} product names to ${csvdir}carousel.csv`);
console.time();

function getProdName() {
  return `${faker.commerce.productName()}\n`;
}

console.log(`Sending ${lines} images to ${csvdir}images.csv`);
const writeStream = fs.createWriteStream(`${csvdir}carousel.csv`);

const header = 'Product Name\n';

writeStream.write(header, 'utf-8');
(async () => {
  for(let i = 0; i < lines; i++) {
    if(!writeStream.write(getProdName(), 'utf-8')) {
      await new Promise (resolve => writeStream.once('drain', resolve));
    }
  }
  writeStream.close();

  const imageStream = fs.createWriteStream(`${csvdir}images.csv`);

  const imgheader = 'Images \n';

  imageStream.write(imgheader, 'utf-8');

  (async() => {
    for(let i = 0; i < lines; i++) {
      if(!imageStream.write(getImages(), 'utf-8')) {
        await new Promise (resolve => imageStream.once('drain', resolve));
      }
    }
    imageStream.close();
  })();
})();


console.timeEnd();