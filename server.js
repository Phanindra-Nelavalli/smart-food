const express = require("express");
const path = require("path");
const bodypraser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { db } = require("./firebase.js");

const router = require("./router");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodypraser.json());
app.use(bodypraser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/route", router);

app.get("/", function (req, res) {
  res.render("index", { title: "Login System" });
});

app.get("/donor_details", async function (req, res) {
  const donorsSnapshot = await db.collection("Donors").get();
  const donors = [];

  donorsSnapshot.forEach((doc) => {
    let userData = doc.data();

    if (userData.dob && userData.dob._seconds) {
      const dobDate = new Date(userData.dob._seconds * 1000);
      userData.dobString = dobDate.toISOString().split("T")[0];
    }

    donors.push(userData);
  });

  res.render("donor_details", { donors: donors });
});

app.get("/user_details", async (req, res) => {
  const usersSnapshot = await db.collection("Users").get();
  const users = [];

  usersSnapshot.forEach((doc) => {
    let userData = doc.data();

    if (userData.dob && userData.dob._seconds) {
      const dobDate = new Date(userData.dob._seconds * 1000);
      userData.dobString = dobDate.toISOString().split("T")[0];
    }

    users.push(userData);
  });

  res.render("user_details", { users: users });
});

app.get("/volunteer_details", async function (req, res) {
  const volunteersSnapshot = await db.collection("Volunteers").get();
  const volunteers = [];

  volunteersSnapshot.forEach((doc) => {
    volunteers.push(doc.data());
  });

  res.render("volunteer_details", { volunteers: volunteers });
});

app.get("/accepted_food", function (req, res) {
  res.render("accepted_food");
});

app.get("/rejected_food", function (req, res) {
  res.render("rejected_food");
});

app.get("/register_donor", function (req, res) {
  res.render("register_donor");
});

app.get("/register_user", function (req, res) {
  res.render("register_user");
});

app.get("/register_volunteer", function (req, res) {
  res.render("register_volunteer");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/composting", function (req, res) {
  res.render("composting");
});

app.get("/feed_animal", function (req, res) {
  res.render("feed_animal");
});

app.get("/industrial_use", function (req, res) {
  res.render("industrial_use");
});

app.get("/landfill", function (req, res) {
  res.render("landfill");
});

app.get("/listed_foods", function (req, res) {
  res.render("listed_foods");
});

app.listen(port, function () {
  console.log("This program is running on http://localhost:3000");
});
