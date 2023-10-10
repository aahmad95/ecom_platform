// const connectToMongo = require("./db");
const path = require("path");

const express = require("express");
// var cors = require("cors");

// connectToMongo();

const app = express();
const port = 5000;

//using cors
// app.use(cors());

//if you want to use the body of request use a middle-ware:
app.use(express.json());
//and set the  header content-type as json

app.use("/", express.static(path.join(__dirname, "public")));

// Available Routes:
// app.get("/", (req, res) => {
//   res.send("Hello Sehar!");
// });

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(
    `E-commerce backend(server)listening at http://localhost:${port}`
  );
});
