const { log } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

//server files from react front end
app.use(express.static(path.join(__dirname, "../dist")));

//create DB in memory
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  //create table
  db.run("CREATE TABLE users (id INT, name TEXT)");

  //create sample user
  db.run('INSERT INTO users (id, name) VALUES (1, "John Smith")');
});

//All users API reoute
//
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on local host ${PORT}`);
});
