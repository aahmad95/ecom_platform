const { User } = require("../models");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const Mailgen = require("mailgen");
// const secret = process.env.JWT_SECRET;
const JWT_SECRET = "HelloWorld";

// Get All Users:
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    if (users.length) {
      return res.status(200).json(users);
    }
    return res.status(204).json({ message: "There isn't any users yet." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not retrieve users",
    });
  }
};

// Create a new User:
const createUser = async (req, res) => {
  const { username, role, address, email, password, image } = req.body;
  try {
    const Email = await User.findOne({
      where: { email },
    });
    if (Email) {
      return res
        .status(201)
        .json({ message: "This email is already have an account." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      role,
      address,
      email,
      password: secPass,
      image,
    });
    const data = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        address: user.address,
        image: user.image,
      },
    };
    console.log("user", user);
    const authToken = jwt.sign(data, JWT_SECRET);

    return res.status(200).json({ authToken });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not create new user.",
    });
  }
};

// Get a User By Id:
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      return res.status(200).json(user);
    }
    return res
      .status(204)
      .json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not find user.",
    });
  }
};

// Delete a User:
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return res.status(200).json({ message: "User deleted successfully" });
    }
    return res
      .status(204)
      .json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not able to delete the user.",
    });
  }
};

// Update a User:
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await User.update(req.body, {
      where: { id },
    });

    if (user) {
      const user = await User.findOne({
        where: { id },
      });
      const data = {
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
          email: user.email,
          address: user.address,
          image: user.image,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({
        message: "User updated successfully.",
        authToken,
      });
    }
    return res
      .status(204)
      .json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not update the user.",
    });
  }
};

// Login a User:
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(204).json({
        message: "Please try to login with correct credentials.",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(204).json({
        message: "Please try to login with correct credentials.",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        address: user.address,
        image: user.image,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({ authToken });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not login user.",
    });
  }
};

const emailConfirmation = async (req, res) => {
  const { name, items, subtotal, deliveryFee, email } = req.body;
  console.log("Email:  ", email);
  {
    // let testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 465,
    //   secure: true, // only true for 465 and false for other ports.
    //   auth: {
    //     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });
    // let message = {
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "bar@example.com, baz@example.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // };
    // transporter
    //   .sendMail(message)
    //   .then(() => {
    //     return res.json({ msg: "Email sent successfully." });
    //   })
    //   .catch((error) => {
    //     return res.json({ Error: error });
    //   });
    // console.log("Message sent: %s", info.messageId);
  }

  let config = {
    service: "gmail",
    auth: {
      user: "sehar.algolix@gmail.com",
      pass: "cgoc jtuu oyma wwpr",
    },
  };
  let transporter = nodemailer.createTransport(config);

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));

  // {
  //   let MailGenerator = new Mailgen({
  //     theme: "default",
  //     product: {
  //       name: "Mailgen",
  //       link: "https://mailgen.js/",
  //     },
  //   });

  //   let response = {
  //     body: {
  //       name: "Sehar",
  //       intro: "Order Placed Succesfully.",
  //       table: {
  //         data: [
  //           {
  //             item: "T-Shirt",
  //             description: "T-Shirt",
  //             price: 1000,
  //           },
  //           {
  //             item: "T-Shirt",
  //             description: "T-Shirt",
  //             price: 1000,
  //           },
  //         ],
  //       },
  //       outro: "Looking forward to do more business",
  //     },
  //   };
  //   let mail = MailGenerator.generate(response);

  // }
  var mailOptions = {
    from: '"E-Commerce Website" <sehar.algolix@gmail.com>',

    to: "seharsaleem08@gmail.com", //user email from body
    subject: "Order Placed Successfully",
    template: "email",
    // html: mail,// template: email,

    context: {
      name: name,
      orderItems: items,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: subtotal + deliveryFee,
    },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(400).json({ error });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(201).json({ msg: "Mail has been sent successfully" });
    }
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  emailConfirmation,
};
