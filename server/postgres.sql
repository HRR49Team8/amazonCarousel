DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

\c testdb

-- GRANT ALL PRIVILEGES ON DATABASE testdb TO postgres;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;

CREATE TABLE IF NOT EXISTS imagess (
  id SERIAL PRIMARY KEY NOT NULL,
  images text[]
);

CREATE TABLE IF NOT EXISTS carousel (
  id SERIAL PRIMARY KEY NOT NULL,
  productName text
);

\COPY carousel(productName) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/carousel.csv' DELIMITER ',' CSV HEADER;

\COPY imagess(images) FROM '/Users/tylerbailey/Desktop/SDC/amazonCarousel/zains-service/server/csv/images.csv' DELIMITER '$' CSV HEADER;

-- run this command:
-- psql -U postgres -f server/postgres.sql