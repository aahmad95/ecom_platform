// const hbs = require("nodemailer-express-handlebars");
// const nodemailer = require("nodemailer");
// const path = require("path");
// const users = ["seharsaleem08@gmail"];
// const emailConfirmation = async () => {
//   // initialize nodemailer
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sehar.algolix@gmail.com",
//       pass: "hahm mwya eqez ctrq",
//     },
//   });

//   // point to the template folder
//   const handlebarOptions = {
//     viewEngine: {
//       partialsDir: path.resolve("./views/"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve("./views/"),
//   };

//   // use a template file with nodemailer
//   transporter.use("compile", hbs(handlebarOptions));

//   for (const user of users) {
//     if (user.email) {
//       const mailOptions = {
//         from: '"E-Commerce Website" <sehar.algolix@gmail.com>', // sender address
//         template: email.handlebars, // the name of the template file, i.e., email.handlebars
//         to: user.email,
//         subject: `Welcome to My Company, ${user.name}`,
//         context: {
//           name: user.name,
//           company: "E-Commerce Website",
//         },
//       };
//       try {
//         await transporter.sendMail(mailOptions);
//       } catch (error) {
//         console.log(`Nodemailer error sending email to ${user.email}`, error);
//       }
//     }
//   }
// };

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
  // emailConfirmation();
});
