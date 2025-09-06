const express = require("express");
const app = express();
console.dir(app);

let port = 8080;

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});

// app.use((req, res) =>{
//     console.log("Request received");
//     res.send({
//         name: "Express Server",
//         version: "1.0.0",
//         description: "A simple Express server example",
//         status: "Running"
//     });
// });

app.get("/", (req, res) => {
  res.send("hello world");

})
app.get("/about", (req, res) => {
  res.send("you are in the about path");
})
app.get("/contact", (req, res) => {
  res.send("you are in the contact path");
})