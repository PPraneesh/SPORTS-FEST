import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import paymentHandler from "../services/Payment";
import "../index.css"

export default function Accommodation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // You can adjust this price as needed
  const accommodationPrice = 1000;

  const onSubmit = (data) => {
    data.category = "Accommodation";
    console.log("Accommodation data: ");
    console.log(data);
    const payersContact = {
      name: data.name,
      mobileNumber: data.mobileNumber,
      email: data.email,
    };
    paymentHandler(data, accommodationPrice, navigate,payersContact );
  };

  return (
    <div>
      <form className="w-[90%] lg:w-2/4 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl pb-2">Accommodation</h1>
        <div>
          <label className="form-label" htmlFor="name">Full Name:</label>
          <input
          className="form-input"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="mobileNumber">Mobile Number:</label>
          <input
            className="form-input"
            type="tel"
            id="mobileNumber"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
          />
          {errors.mobileNumber && <span>{errors.mobileNumber.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label className="form-label" htmlFor="gender">Gender:</label>
          <select
            className="form-select"
            id="gender"
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>
        <div>
          <label className="form-label" htmlFor="age">Age:</label>
          <input
            className="form-input"
            type="number"
            id="age"
            {...register("age", {
              required: "Age is required",
              min: {
                value: 16,
                message: "Age must be at least 16",
              },
              max: {
                value: 99,
                message: "Age must be less than 100",
              },
            })}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="bloodGroup">Blood Group:</label>
          <select
            className="form-select"
            id="bloodGroup"
            {...register("bloodGroup", { required: "Blood group is required" })}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && <span>{errors.bloodGroup.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="collegeName">College Name:</label>
          <input
            className="form-input"
            type="text"
            id="collegeName"
            {...register("collegeName", {
              required: "College name is required",
            })}
          />
          {errors.collegeName && <span>{errors.collegeName.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="collegeId">College ID / Roll Number:</label>
          <input
            className="form-input"
            type="text"
            id="collegeId"
            {...register("collegeId", {
              required: "College ID / Roll Number is required",
            })}
          />
          {errors.collegeId && <span>{errors.collegeId.message}</span>}
        </div>

        <div>
          <label className="form-label" htmlFor="yearOfStudy">Year of Study:</label>
          <select
            className="form-select"
            id="yearOfStudy"
            {...register("yearOfStudy", {
              required: "Year of study is required",
            })}
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
          {errors.yearOfStudy && <span>{errors.yearOfStudy.message}</span>}
        </div>

        <button className="submit-button" type="submit">Book Accommodation</button>
      </form>
    </div>
  );
}
