const pg = require("pg");
const express = require("express");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_icecream_shop"
);
const app = express();

app.use(express.json());
app.use(require("morgan")("dev"));
app.post("/api/notes", async (req, res, next) => {
  try {
    app.post();
  } catch (error) {
    console.log(error);
  }
  const SQL = `SELECT * from notes ORDER BY created_at DESC;
  INSERT INTO notes(txt) VALUES ${1} RESULT *
  `;
  const response = await client.query(SQL);
  res.send(response.rows);
});
app.get("/api/notes", async (req, res, next) => {
  try {
    app.get();
  } catch (error) {
    console.log(error);
  }
  const SQL = `SELECT * from notes ORDER BY created_at DESC;`;
  const response = await client.query(SQL);
  res.send(response.rows);
});
app.put("/api/notes/:id", async (req, res, next) => {
  try {
    app.put();
  } catch (error) {
    console.log(error);
  }
  const SQL = `SELECT * from notes ORDER BY created_at DESC;`;
  const response = await client.query(SQL);
  res.send(response.rows);
});
app.delete("/api/notes/:id", async (red, res, next) => {
  try {
    app.delete();
  } catch (error) {
    console.log(error);
  }
  const SQL = `SELECT * from notes ORDER BY created_at DESC;`;
  const response = await client.query(SQL);
  res.send(response.rows);
});

const init = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
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
