DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

\c testdb;

CREATE TABLE IF NOT EXISTS carousel (
  id SERIAL PRIMARY KEY NOT NULL,
  productName text
);

CREATE TABLE IF NOT EXISTS imagess (
  id SERIAL PRIMARY KEY NOT NULL,
  images text[]
);

\COPY carousel(productName) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/carousel.csv' DELIMITER ',' CSV HEADER;

\COPY imagess(images) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/images.csv' DELIMITER '$' CSV HEADER;

CREATE INDEX ON carousel(productName);

-- run this command:
-- psql -U postgres -f server/postgres.sql