const path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use(path.join(__dirname, 'public'));
// app.use(path.join(__dirname, '/public/css'));

app.set('view engine', 'ejs');
app.set('views',path.join( __dirname + '/views'));


app.get('/', (req, res) => {
  res.render("home.ejs");
});

app.get("/ig/:username", (req, res) => {
  // const  follower = ["nikhil_07", "nikhil_0708", "nikhil_0709"];
  let {username} = req.params;
  // console.log(username);
  const instaData =require('./data.json');
  const data  =  instaData[username];
  console.log(data);
  res.render("instagram.ejs", {data} );
});



app.get("/rolldice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs" , { num: diceVal });
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
