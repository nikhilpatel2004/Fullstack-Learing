const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// DB Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Sigma_app',
  password: 'Mysql@2004'
});

// Function to generate random user
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home page → show total users
app.get('/', (req, res) => {
  let q = `SELECT COUNT(*) AS total FROM user`;
  connection.query(q, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    let count = results[0].total;
    res.render("home.ejs", { count });
  });
});

// User page → show all users in table
app.get('/user', (req, res) => {  
  let q = `SELECT * FROM user`;
  connection.query(q, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    res.render("users.ejs", { users: results });
  });
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = ?`;

  connection.query(q, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error occurred");
    }
    if (results.length === 0) {
      return res.send("User not found");
    }
    res.render("edit.ejs", { user: results[0] }); // ek user bhejna
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
