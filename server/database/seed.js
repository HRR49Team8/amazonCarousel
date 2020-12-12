const faker = require('faker');
const fs = require('fs');

const csvdir = './server/csv/';

const getImages = () => {
  const randomLEN = Math.floor(Math.random() * Math.floor(7)) + 1;
  const imageArray = {};
  for (let j = 0; j < randomLEN; j++) {
    const randomIMG = Math.floor(Math.random() * Math.floor(50));
    imageArray[j] = (`https://zainfecservice.s3.amazonaws.com/Random+Images/${randomIMG}.jpg`);
  }
  return `${JSON.stringify(imageArray)}\n`;
};

const lines = 10000000;
// const lines = 10;
console.log(`Sending ${lines} product names to ${csvdir}carousel.csv`);
console.time();

function getProdName() {
  return `${faker.commerce.productName()}\n`;
}

console.log(`Sending ${lines} images to ${csvdir}images.csv`);
const writeStream = fs.createWriteStream(`${csvdir}carousel.csv`);
const header = 'Product Name \n';

writeStream.write(header, 'utf-8');
(async () => {
  for (let i = 0; i < lines; i++) {
    if (!writeStream.write(getProdName(), 'utf-8')) {
      await new Promise((resolve) => writeStream.once('drain', resolve));
    }
  }
  writeStream.close();

  const imageStream = fs.createWriteStream(`${csvdir}images.csv`);
  const imgheader = 'Images \n';
  imageStream.write(imgheader, 'utf-8');

  (async () => {
    for (let i = 0; i < lines; i++) {
      if (!imageStream.write(getImages(), 'utf-8')) {
        await new Promise((resolve) => imageStream.once('drain', resolve));
      }
    }
    imageStream.close();
  })();
})();

console.timeEnd();
