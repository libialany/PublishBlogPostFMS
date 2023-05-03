CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  state VARCHAR(30)
);
INSERT INTO users (name, email,state)
  VALUES ('Jerry', 'jerry@example.com','pending'), ('George', 'george@example.com','pending');