DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

\c testdb

-- CREATE TABLE IF NOT EXISTS carousel (
--   id SERIAL PRIMARY KEY NOT NULL,
--   productName text
-- );

CREATE TABLE IF NOT EXISTS imagess (
  id SERIAL PRIMARY KEY NOT NULL,
  images text[]
  -- productID int references carousel(id)
);

-- SELECT * FROM carousel CROSS JOIN imagess;

-- \COPY carousel(productName) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/carousel.csv' DELIMITER ',' CSV HEADER;

\COPY imagess(images) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/images.csv' DELIMITER '$' CSV HEADER;

-- SELECT * FROM carousel CROSS JOIN imagess;
-- run this command:
-- psql -U postgres -f server/postgres.sql