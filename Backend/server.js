// const path = require("path");

const express = require("express");
// var bodyParser = require("body-parser");
var cors = require("cors");

const { sequelize } = require("./models");

const app = express();
const port = 5000;
// app.use(express.bodyParser({ limit: "50mb" }));
//using cors
app.use(cors());

//if you want to use the body of request use a middle-ware:
app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
//and set the  header content-type as json

//static Images Folder
app.use("/Images", express.static("./Images"));
// app.use(express.urlencoded({ extended: true }));

// app.use("/", express.static(path.join(__dirname, "public")));
// app.use("/api", require("./routes/api").route);

// Available Routes:
// app.get("/", (req, res) => {
//   res.send("Hello Sehar!");
// });

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/notes", require("./routes/notes"));
// /api/v1
const user = require("./routes/user");
app.use("/api/v1/users", user);

const ads = require("./routes/ad");
app.use("/api/v1/get", ads);

const category = require("./routes/category");
app.use("/api/v1/category", category);

const wallet = require("./routes/wallet");
app.use("/api/v1/wallet", wallet);

const product = require("./routes/product");
app.use("/api/v1/product", product);

const productDetail = require("./routes/productDetail");
app.use("/api/v1/productDetail", productDetail);

const order = require("./routes/order");
app.use("/api/v1/order", order);

const orderItem = require("./routes/orderItem");
app.use("/api/v1/orderItem", orderItem);

app.listen(port, async () => {
  console.log(
    `E-commerce Website backend(server) listening at http://localhost:${port}`
  );
  await sequelize.authenticate();
  console.log("Database connected!");
});
