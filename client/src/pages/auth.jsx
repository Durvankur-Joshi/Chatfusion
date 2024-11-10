import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { apiClient } from '../lib/api-client';
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [email, setEmail] = useState("");
  const { setUserInfo } = useAppStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate();

  const validateSignup = () => {
    if (!email.length) {
      toast.error('Email is required');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error('Email is required');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTES, { email, password }, { withCredentials: true });
        if (response.status === 200) { // assuming signup returns a 201 Created status
          toast.success('Signup successful!');
          navigate("/profile");
          setUserInfo(response.data.user);
          console.log(response.data.user)
        } else {
          toast.error('Unexpected response. Please try again.');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); // show specific error from server
        } else {
          toast.error('Signup failed. Please try again.');
        }
        console.error("Error during signup:", error);
      }
    }
  };
  

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });

        if (response.data.user && response.data.user.id) {
          toast.success('Login successful!');
          setUserInfo(response.data.user);
          
          if (response.data.user.profileSetup === true) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        } else {
          toast.error("Login failed: User not found");
        }
      } catch (error) {
        toast.error("Error during login: Invalid credentials");
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      <div className="bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw]">
        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`py-2 px-4 rounded-lg font-semibold ${activeTab === "signup" ? "bg-purple-700" : "bg-gray-800"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 px-4 rounded-lg font-semibold ${activeTab === "login" ? "bg-purple-700" : "bg-gray-800"}`}
          >
            Login
          </button>
        </div>

        {activeTab === "signup" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-indigo-100">Welcome</h1>
              <p className="mt-4 text-lg lg:text-xl text-gray-300">Fill in the details to get started!</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full space-y-4">
                <label className="block">
                  <span className="text-gray-300">Email</span>
                  <input
                    type="email"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-300">Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-300">Confirm Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <button
                  onClick={handleSignUp}
                  className="w-full py-2 mt-4 bg-purple-700 hover:bg-purple-900 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-indigo-300">Welcome Back</h1>
              <p className="mt-4 text-lg lg:text-xl text-gray-300">Login to continue!</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full space-y-4">
                <label className="block">
                  <span className="text-gray-300">Email</span>
                  <input
                    type="email"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-gray-300">Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  onClick={handleLogin}
                  className="w-full py-2 mt-4 bg-purple-700 hover:bg-purple-900 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
