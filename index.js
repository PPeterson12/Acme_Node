const pg = require("pg");
const express = require("express");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_icecream_shop"
);
const app = express();

const init = async () => {
  await client.connect();
  console.log("connected to database");

  let SQL = `DROP TABLE IF EXISTS notes;
  CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ranking INTEGER DEFAULT 3 NOT NULL,
    txt VARCHAR(255) NOT NULL
  )`;

  await client.query(SQL);
  console.log("table created");
  SQL = `INSERT INTO notes(txt, ranking) VALUES('learn express', 5);
        INSERT INTO notes(txt, ranking) VALUES ('write SQL queries', 4);
        INSERT INTO notes (txt, ranking) VALUES ('create routes', 2);
  `;

  await client.query(SQL);
  console.log("data seeded");
};

init();
