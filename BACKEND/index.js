const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const { createHash } = require('crypto');

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("fetch data from database and send");
});
app.post("/register", (req, res) => {
    const paymentData = {
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": "MT7850590068188104",
        "merchantUserId": "MUID123",
        "amount": 10000,
        "redirectUrl": "https://webhook.site/redirect-url",
        "redirectMode": "REDIRECT",
        "callbackUrl": "https://webhook.site/callback-url",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    }
    const string = JSON.stringify(paymentData);
    const Checksum = createHash('sha256').update(string).digest('hex');

      
  res.send("data received");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
