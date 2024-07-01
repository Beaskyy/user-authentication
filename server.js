const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);

const initializePassport = require("./passport-config");
const passport = require("passport");
const flash = require("express-flash");
initializePassport(passport, (email) =>
  users.find((user) => user.email === email)
);

const users = [];

// home
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Afeez!" });
});

// login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
});

// register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    });
    console.log(users);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.listen(3000, () => {
  console.log("server listening on port 3000...");
});
