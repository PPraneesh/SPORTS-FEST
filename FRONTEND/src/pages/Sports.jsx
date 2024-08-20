import { useState } from "react";
import { useForm } from "react-hook-form";
import sports from "../data/data";
import paymentHandler from "../services/Payment";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Sports() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedSport, setSelectedSport] = useState({});

  const handleSportChange = (e) => {
    setSelectedSport(sports[e.target.value]);
  };

  async function formSubmit(data) {
    const payersContact = {
      name: data.payersContact.name,
      email: data.payersContact.email,
      mobileNumber: data.payersContact.mobileNumber,
    };
    console.log(payersContact);
    paymentHandler(data, selectedSport.price, navigate, payersContact);
  }

  return (
    <form
      className="w-[90%] lg:w-2/4 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow"
      onSubmit={handleSubmit(formSubmit)}
    >
      <label htmlFor="sport" className="form-label">
        Choose a sport:
      </label>
      <select
        name="sport"
        className="form-select"
        {...register("category", {
          onChange: (e) => handleSportChange(e),
          required: "Please select a sport",
        })}
      >
        <option value="">Select a sport</option>
        {Object.keys(sports).map((sportKey) => (
          <option key={sportKey} value={sportKey}>
            {sportKey.replace(/_/g, " ")}
          </option>
        ))}
      </select>
      {errors.category && <p className="form-error">{errors.category.message}</p>}

      <label htmlFor="collegeName" className="form-label">
        College Name
      </label>
      <input
        type="text"
        name="collegeName"
        placeholder="Enter college name"
        className="form-input"
        {...register("collegeName", { required: "College name is required" })}
      />
      {errors.collegeName && <p className="form-error">{errors.collegeName.message}</p>}

      <h2>Enter the main players details</h2>
      {Array.from({ length: selectedSport.mainplayers }).map((_, i) => (
        <div key={i} className="player-details">
          <h2 className="pt-1 text-zinc-900">{`Player ${i + 1} details`}</h2>
          <input
            type="text"
            placeholder={`Enter player ${i + 1} name`}
            className="form-input"
            {...register(`mainplayers.${i}.name`, {
              required: `Player ${i + 1} name is required`,
            })}
          />
          {errors.mainplayers?.[i]?.name && (
            <p className="form-error">{errors.mainplayers[i].name.message}</p>
          )}

          <input
            type="text"
            placeholder={`Enter player ${i + 1} college ID`}
            className="form-input"
            {...register(`mainplayers.${i}.collegeID`, {
              required: `Player ${i + 1} college ID is required`,
            })}
          />
          {errors.mainplayers?.[i]?.collegeID && (
            <p className="form-error">{errors.mainplayers[i].collegeID.message}</p>
          )}

          {i < 2 && (
            <>
              <input
                type="email"
                placeholder={`Enter player ${i + 1} email`}
                className="form-input"
                {...register(`mainplayers.${i}.email`, {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.mainplayers?.[i]?.email && (
                <p className="form-error">{errors.mainplayers[i].email.message}</p>
              )}

              <input
                type="tel"
                placeholder={`Enter player ${i + 1} phone number (+91)`}
                className="form-input"
                {...register(`mainplayers.${i}.phone`, {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+91\d{10}$/,
                    message:
                      "Phone number must start with +91 and have 10 digits",
                  },
                })}
              />
              {errors.mainplayers?.[i]?.phone && (
                <p className="form-error">{errors.mainplayers[i].phone.message}</p>
              )}
            </>
          )}

          <select
            className="form-select"
            {...register(`mainplayers.${i}.gender`, {
              required: "Gender is required",
            })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.mainplayers?.[i]?.gender && (
            <p className="form-error">{errors.mainplayers[i].gender.message}</p>
          )}
        </div>
      ))}

      {selectedSport.substitutes > 0 && (<>
        <h2>Substitutes details</h2>
        {Array.from({ length: selectedSport.substitutes }).map((_, i) => (
        <div key={i} className="player-details">
          <h2 className="pt-1">{`Subsutitute Player ${
            i + 1
          } details`}</h2>
          <input
            type="text"
            className="form-input"
            placeholder={`Enter substitute ${i + 1} name`}
            {...register(`substitutes.${i}.name`)}
          />

          <input
            type="text"
            className="form-input"
            placeholder={`Enter substitute ${i + 1} college ID`}
            {...register(`substitutes.${i}.collegeID`)}
          />

          <select
            className="form-select"
            {...register(`substitutes.${i}.gender`)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      ))}
      </>)}
      <div className="player-details">
        <h2 className="pt-1 text-xl">Payers details</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-input"
          {...register("payersContact.name", {
            required: "Name is required",
          })}
        />
        {errors.payersContact?.name && (
          <p className="form-error">{errors.payersContact.name.message}</p>
        )}
        {/* email and mobile */}
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          {...register("payersContact.email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.payersContact?.email && (
          <p className="form-error">{errors.payersContact.email.message}</p>
        )}
        <input
          type="tel"
          placeholder="Enter your phone number (+91)"
          className="form-input"
          {...register("payersContact.mobileNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^\+91\d{10}$/,
              message: "Phone number must start with +91 and have 10 digits",
            },
          })}
        />
        {errors.payersContact?.mobileNumber && (
          <p className="form-error">{errors.payersContact.mobileNumber.message}</p>
        )}
      </div>
      <h2>You will be paying {selectedSport.price}/-</h2>
      <button className="submit-button" type="submit">
        Pay
      </button>
    </form>
  );
}

export default Sports;
