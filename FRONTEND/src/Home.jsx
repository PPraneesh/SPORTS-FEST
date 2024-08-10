import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import sports from "./data";
import { useNavigate } from "react-router-dom";
const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY;

function Home (){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [selectedSport, setSelectedSport] = useState({});
    const handleSportChange = (e) => {
      setSelectedSport(sports[e.target.value]);
    };
    async function formSubmit(e) {
      console.log(e);
      const price = sports[e.sport].price;
      axios
        .post("http://localhost:3000/register", {
          sport: e.sport,
          amount: price,
          ...e
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
              order_id: res.data.order_id,
              callback_url: "http://localhost:3000/success",
              handler: function (response) {
                axios.post("http://localhost:3000/success", {
                  response: response,
                  sport: res.data.sport,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                }, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res)=>{
                    if(res.data.status){
                        navigate("/success");
                    }
                    console.log(res.data);
                  console.log(response.razorpay_order_id);
                  console.log(response.razorpay_payment_id);
                  console.log(response.razorpay_signature);
                })
                .catch((err)=>{
                  console.log(err);
                })
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            // eslint-disable-next-line no-undef
            var rzp1 = new Razorpay(options);
  
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });
            rzp1.open();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
        <>
        <div>
          <h1>SPORTS FEST</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
            <label htmlFor="sport">Choose a sport:</label>
  
            <select
              name="sport"
              {...register("sport", {
                onChange: (e) => {
                  handleSportChange(e);
                },
              })}
            >
              <option value="Badminton_Singles-M"> Badminton_Singles-M</option>
              <option value="Badminton_Singles-W"> Badminton_Singles-W</option>
              <option value="Badminton_Doubles-M"> Badminton_Doubles-M </option>
              <option value="Badminton_Doubles-W"> Badminton_Doubles-W </option>
              <option value="Basketball-M"> Basketball-M </option>
              <option value="Basketball-W"> Basketball-W </option>
              <option value="Chess_Singles-M"> Chess_Singles-M</option>
              <option value="Cricket-M"> Cricket-M</option>
              <option value="Football-M"> Football-M</option>
              <option value="Kabaddi-M"> Kabaddi-M</option>
              <option value="Kabaddi-W"> Kabaddi-W </option>
              <option value="Table_Tennis_singles-M">
                Table_Tennis_singles-M
              </option>
              <option value="Table_Tennis_doubles-M">
                Table_Tennis_doubles-M
              </option>
              <option value="Throwball-W"> Throwball-W </option>
              <option value="Volleyball-M"> Volleyball-M </option>
              <option value="Volleyball-W"> Volleyball-W </option>
            </select>
          <h2>you will be paying {selectedSport.price}/-</h2>
          <input type="text" placeholder="Enter college name" {...register("collegeName")} />
          <h2>Enter the main players details</h2>
          {Array.from({ length: selectedSport.mainplayers }).map((_, i) => {return (<div key={i}>
              <input
                type="text"
                placeholder={`Enter player${i + 1}`}
                {...register(`mainplayers.${i}.name`)}
              />
              <input
                type="text"
                placeholder={`Enter player${i + 1} collegeID`}
                {...register(`mainplayers.${i}.collegeID`)}
              />
               <select {...register(`mainplayers.${i + 1}.gender`)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          )})}
          <h2> substitutes details</h2>
          {Array.from({ length: selectedSport.substitutes }).map((_, i) => {return (<div key={i}>
              <input
                type="text"
                placeholder={`Enter player${i + 1}`}
                {...register(`substitutes.${i}.name`)}
              />
              <input
                type="text"
                placeholder={`Enter player${i + 1} collegeID`}
                {...register(`substitutes.${i}.collegeID`)}
              />
               <select {...register(`substitutes.${i + 1}.gender`)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          )})}
          <button type="submit">pay</button>
          </form>
        </div>
      </>
    )
}

export default Home;