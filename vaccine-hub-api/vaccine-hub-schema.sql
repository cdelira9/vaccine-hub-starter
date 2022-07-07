CREATE TABLE users(
id          SERIAL PRIMARY KEY,
password    TEXT NOT NULL,
first_name  TEXT NOT NULL,
last_name   TEXT NOT NULL,
email       TEXT NOT NULL CHECK(POSITION('@' IN email) > 1),
location    TEXT NOT NULL,
data        TIMESTAMP NOT NULL DEFAULT NOW()
);