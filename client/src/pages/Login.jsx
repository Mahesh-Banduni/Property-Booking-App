import React from "react";
import useLogin from "../hooks/useLogin";
import { background } from "../utils/icons";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading, status } = useLogin();

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold text-center">
          Property Booking Login
        </h2>

        {status.message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              status.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:bg-white"
            placeholder="Enter your email"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:bg-white"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-md font-bold text-white transition ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-amber-600 hover:text-amber-700">
            Sign Up
          </NavLink>
        </p> */}
      </div>
    </div>
  );
};

export default Login;