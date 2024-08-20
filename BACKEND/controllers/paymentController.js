const db = require("../config/db");
const razorpay = require("../config/razorpayconfig");
const { updateStats } = require("./statsController");
exports.register = (req, res) => {
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11", // check about this
  };
  try {
    const category = db.collection(req.body.category);
    const order = razorpay.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        return res.send({ status: false, data: req.body });
      } else {
        category.add({
          ...req.body,
          payment_status: false,
          order_id: order.id,
        });
        res.send({
          status: true,
          order_id: order.id,
          category: req.body.category,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ status: false, data: req.body });
  }
};
exports.success = async (req, res) => {
  console.log("success ", req.body);
  const category = db.collection(req.body.category);
  const team = await category.where("order_id", "==", req.body.order_id).get();
  if (team.empty) {
    res.send({ status: false, message: "no such order id found" });
  } else {
    let registrationData;
    team.forEach((doc) => {
      registrationData = doc.data();
      category.doc(doc.id).update({
        payment_status: true,
      });
    });
    console.log("registration data", registrationData);
    try {
      const regType =
        registrationData.category === "Accommodation" ? "accommodation" : "sports";
      await updateStats(registrationData, regType);
      console.log("payment success and stats updated");
      res.send({
        status: true,
        message: "payment success and updated in database",
      });
    } catch (error) {
      console.error("Error updating stats:", error);
      res.send({
        status: true,
        message: "payment success, but error updating stats",
      });
    }
  }
};
