import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux-toolkit/accountSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const { isLoading, isError, error } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.payload.status == 200)
      {
        toast.success("Login Successfully");
      }
      else
      {
        toast.error(result.payload.message);
      }
      navigate('/')
    });
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {isLoading && <p className="text-center text-blue-500">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
