import axios from "axios";
const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY;

export default function paymentHandler(e, price, navigate, payersContact) {
  console.log(e);
  axios
    .post("http://localhost:3000/api/register", {
      category: e.category,
      amount: price,
      ...e,
    })
    .then((res) => {
      if (res.data.status) {
        // for register route, which saves data in database
        console.log("in axios", res.data);
        alert(`order id Successful ${res.data.order_id}`);
        var options = {
          key: razorpay_key, // Enter the Key ID generated from the Dashboard
          amount: price * 100,
          currency: "INR",
          name: "SPORTS FEST",
          description: "Pay for the scam",
          image: "https://example.com/your_logo",
          prefill: {
            name: payersContact.name,
            email: payersContact.email,
            contact: payersContact.mobileNumber,
          },
          order_id: res.data.order_id,
          callback_url: "http://localhost:3000/api/success",
          handler: function (response) {
            axios
              .post(
                "http://localhost:3000/api/success",
                {
                  response: response,
                  category: res.data.category,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                if (res.data.status) {
                  navigate("/success", {
                    state: { data: response, success: true },
                  });
                  console.log(res.data);
                  console.log(response.razorpay_order_id);
                  console.log(response.razorpay_payment_id);
                  console.log(response.razorpay_signature);
                }
              })
              .catch((err) => {
                console.error(err);
                navigate("/failure", {
                  state: { error: "Payment confirmation failed" },
                });
              });
          },
          notes: {
            category: res.data.category,
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        // eslint-disable-next-line no-undef
        var rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          console.error("Payment failed:", response.error);
          navigate("/failure", {
            state: {
              error: response.error.description || "Payment failed",
              reason: response.error.reason || "Unknown",
            },
          });
        });
        rzp1.open();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
