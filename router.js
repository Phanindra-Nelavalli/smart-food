const express = require("express");
var router = express.Router();
const axios = require("axios");
const { db } = require("./firebase.js");

router.post("/user_reg", async (req, res) => {
  try {
    const { name, email, password, phone, dob, confirmpass } = req.body;
    const userRef = db.collection("Users").doc(email);
    const resp1 = await userRef.get();
    const number = parseInt(phone, 10);
    const dobDate = new Date(dob);

    if (resp1.exists) {
      return res.status(401).send("Account Already Exists");
    } else {
      await userRef.set({
        name: name,
        email: email,
        password: password,
        number: number,
        dob: dobDate,
      });

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
    }
  } catch (error) {
    console.error("Error in user_reg route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/donor_reg", async (req, res) => {
  try {
    const { name, email, password, phone, dob, confirmpass } = req.body;
    const userRef = db.collection("Donors").doc(email);
    const resp1 = await userRef.get();
    const number = parseInt(phone, 10);
    const dobDate = new Date(dob);

    if (resp1.exists) {
      return res.status(401).send("Account Already Exists");
    } else {
      await userRef.set({
        name: name,
        email: email,
        password: password,
        number: number,
        dob: dobDate,
      });

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
    }
  } catch (error) {
    console.error("Error in donor_reg route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/volunteer_reg", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const userRef = db.collection("Volunteers").doc(email);
    const resp1 = await userRef.get();
    const number = parseInt(phone, 10);

    if (resp1.exists) {
      return res.status(401).send("Account Already Exists");
    } else {
      await userRef.set({
        name: name,
        email: email,
        password: password,
        number: number,
        address: address,
      });

      const volunteersSnapshot = await db.collection("Volunteers").get();
      const volunteers = [];

      volunteersSnapshot.forEach((doc) => {
        volunteers.push(doc.data());
      });

      res.render("volunteer_details", { volunteers: volunteers });
    }
  } catch (error) {
    console.error("Error in donor_reg route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRef = db.collection("Users").doc(email);
    const resp = await userRef.get();

    if (!resp.exists) {
      return res.status(401).send("Invalid email id");
    } else {
      const userData = resp.data();
      if (password === userData.password) {
        const userName = userData.name;
        res.render("index", { title: "Login System" });
      } else {
        return res.status(401).send("Invalid password");
      }
    }
  } catch (error) {
    console.error("Error in login route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/add_food", async (req, res) => {
  try {
    const { foodName, quantity, expiry, status } = req.body;
    const userRef = db.collection("Food");
    const count = parseInt(quantity, 10);
    const expirydate = new Date(expiry);

    await userRef.add({
      foodname: foodName,
      quantity: count,
      expiry: expirydate,
      status: status,
    });
    res.render("success");
  } catch (error) {
    console.error("Error in login route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
