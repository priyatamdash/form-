const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const Register = require('./models/register');

const hbs = require("hbs");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const { name, lastname, email, gender, phone, age, password, confirmpassword } = req.body;

    if (password === confirmpassword) {
      const registerEmployee = new Register({
        firstname: name,
        lastname,
        email,
        gender,
        phone,
        age,
        password,
        confirmpassword
      });

      await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("Passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
