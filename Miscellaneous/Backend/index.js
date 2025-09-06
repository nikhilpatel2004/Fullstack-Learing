const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/register', (req, res) => {
  let {username ,password} = req.query;
    res.send(`Hello World! Get ${username}!`);
});

app.post('/register', (req, res) => {

  let {username ,password} = req.query;
  
    res.send(`Hello World! Post'${username}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});