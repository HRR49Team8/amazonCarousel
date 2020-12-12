-- DROP DATABASE IF EXISTS testdb;

-- CREATE DATABASE testdb;

-- \c testdb;

-- CREATE TABLE IF NOT EXISTS carousel (
--   id SERIAL PRIMARY KEY NOT NULL,
--   productName text
-- );

-- CREATE TABLE IF NOT EXISTS imagess (
--   id SERIAL PRIMARY KEY NOT NULL,
--   images text[]
-- );

-- \COPY carousel(productName) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/carousel.csv' DELIMITER ',' CSV HEADER;

-- \COPY imagess(images) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/images.csv' DELIMITER '$' CSV HEADER;

-- CREATE INDEX ON imagess(images);

DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

\c testdb;

CREATE TABLE IF NOT EXISTS carousel (
  id SERIAL PRIMARY KEY NOT NULL,
  productName text
);
-- CREATE TABLE IF NOT EXISTS carousel (
--   id SERIAL,
--    PRIMARY KEY(id),
--   productName text
-- );

CREATE TABLE IF NOT EXISTS imagess (
  id SERIAL PRIMARY KEY NOT NULL,
  images text[]
);
-- CREATE TABLE IF NOT EXISTS imagess (
--   productID INT NOT NULL,
--   id SERIAL,
--   PRIMARY KEY (id),
--   images text[],
--   FOREIGN KEY (productID)
--     REFERENCES carousel(id)
-- );

\COPY carousel(productName) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/carousel.csv' DELIMITER ',' CSV HEADER;

\COPY imagess(images) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/images.csv' DELIMITER '$' CSV HEADER;

CREATE INDEX ON carousel(productName);
CREATE INDEX ON carousel(id);

CREATE INDEX ON imagess(id);
CREATE INDEX ON imagess(images);

-- CREATE TABLE joined AS
-- SELECT carousel.id, carousel.productName, imagess.images FROM carousel
-- INNER JOIN imagess ON carousel.id = imagess.id;

-- CREATE INDEX ON joined(id);

-- run this command:
-- psql -U postgres -f server/postgres.sql