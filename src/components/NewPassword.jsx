import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewPassword = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [timerOn, setTimerOn] = useState(false); // State to control timer start/stop

  const initialValues = {
    email: "",
    otp: "",
    new_password: "",
    re_new_password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP must be a 4-digit number")
      .length(4, "OTP must be exactly 4 digits")
      .required("OTP is required"),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    re_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timerOn]);

  const startTimer = () => {
    setTimer(60);
    setTimerOn(true);
  };

  const handleResendOTP = () => {
    // Fetch new OTP logic here
    fetch(`http://192.168.1.10:8000/user/password-reset/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: initialValues.email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to resend OTP");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("OTP Resent Successfully");
        startTimer(); // Start timer again
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    fetch(`http://192.168.1.10:8000/user/password-reset-confirm/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid OTP");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Password changed successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Change Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Enter Your Email
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="otp"
                >
                  Enter OTP
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="otp"
                  placeholder="OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {timerOn && (
                  <p className="text-gray-700 text-xs mt-1">
                    Resend OTP in {timer} seconds
                  </p>
                )}
                {!timerOn && (
                  <button
                    className="text-indigo-600 hover:text-indigo-800 text-xs mt-1"
                    type="button"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="new_password"
                >
                  New Password
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="new_password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="re_new_password"
                >
                  Re-enter Password
                </label>
                <Field
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="re_new_password"
                  placeholder="Re-enter Password"
                />
                <ErrorMessage
                  name="re_new_password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                Change Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewPassword;
