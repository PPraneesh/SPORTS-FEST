const express = require("express");
const axios = require("axios");
const cors = require("cors");

const Razorpay = require("razorpay");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.get("/", (req, res) => {
  res.send("fetch data from database and send");
});

app.post("/register", (req, res) => {
  console.log("req.body i say", req.body);
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11", // check about this
  };
  try {
    const sport = db.collection(req.body.sport);
    const order = razorpay.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        return res.send({ status: false, data: req.body });
      } else {
        sport.add({
          ...req.body,
          payment_status: false,
          order_id: order.id,
        });
        res.send({ status: true, order_id: order.id, sport: req.body.sport });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ status: false, data: req.body });
  }
});

app.post("/success", async (req, res) => {
  console.log("success ", req.body);
  const sport = db.collection(req.body.sport);
  const team = await sport.where("order_id", "==", req.body.order_id).get();
  if (team.empty) {
    res.send({status : false, message : "no such order id found"});
  } else {
    team.forEach((doc) => {
      sport.doc(doc.id).update({
        payment_status: true,
      });
    });
    console.log("payment success");
    res.send({status : true, message : "payment success and updated in database"});
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
