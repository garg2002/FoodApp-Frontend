import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
    if (timerOn && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimerOn(false);
    }
  }, [timerOn, timer]);

  const startTimer = () => {
    setTimer(60);
    setTimerOn(true);
  };

  const handleGetOTP = (email) => {
    fetch(`http://192.168.1.10:8000/user/password-reset/`, {
      method: "POST",
        headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send OTP");
        }
        return response.json();
      })
      .then(() => {
        toast.success("OTP sent successfully");
        setOtpSent(true);
        startTimer();
      })
      .catch((error) => toast.error(error.message));
  };

  const handleResendOTP = (email) => {
    fetch(`http://192.168.1.10:8000/user/password-reset/`, {
      method: "POST",
        headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to resend OTP");
        }
        return response.json();
      })
      .then(() => {
        toast.success("OTP Resent Successfully");
        startTimer();
      })
      .catch((error) => toast.error(error.message));
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
          throw new Error("Invalid OTP or other error");
        }
        return response.json();
      })
      .then(() => {
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
          Reset Password
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="mb-4 flex justify-between items-center w-full">
                <Field
                  className="w-3/4 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none "
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <button
                  type="button"
                  className="bg-indigo-500 w-1/4 text-white py-2 px-3 rounded-r-lg hover:bg-indigo-600 transition-colors duration-300"
                  onClick={() => handleGetOTP(values.email)}
                  disabled={otpSent}
                >
                  Get OTP
                </button>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500  text-sm m-2"
              />
              {otpSent && (
                <>
                  <div className="mb-4">
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
                    {timerOn ? (
                      <p className="text-gray-700 text-xs mt-1">
                        Resend OTP in {timer} seconds
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-800 text-xs mt-1"
                        onClick={() => handleResendOTP(values.email)}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <div className="mb-4">
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
                </>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                disabled={isSubmitting || !otpSent}
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

export default ForgetPassword;
