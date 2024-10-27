import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useAppStore } from '../store'; // Import your Zustand store
import { apiClient } from '../lib/api-client';
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '../utils/constants';
import axios from 'axios';

  
  


const Auth = () => {
  const [email, setEmail] = useState("");
  const {setUserInfo} = useAppStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("signup"); // State to manage active tab
  const navigate = useNavigate(); 

  const validateSignup = () => {
    if (!email.length) {
      alert('Email is required');
      return false;
    }
    if (!password.length) {
      alert('Password is required');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
      return false;
    }
    return true;
  };

  const validateLogin = () =>{
    if (!email.length) {
      alert('Email is required');
      return false;
    }
    if (!password.length) {
      alert('Password is required');
      return false;
    }
    return true
  }

  const handleSignUp = async (event) => {
    if (validateSignup) {
      const response = await apiClient.post(SIGNUP_ROUTES , {email , password} , { withCredentials: true});
       
      console.log({response});
      
    }else {
      console.error(error);

  };
}


  const handleLogin = async () => {
    if (validateLogin()) {  // Ensure this is a function if needed
      try {
        const response = await apiClient.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });
  
        if (response.data.user && response.data.user.id) {
          // Set user info in state
          setUserInfo(response.data.user);
  
          // Redirect based on profile setup status
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        } else {
          console.error("Login failed: User not found");
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Optionally, show an error message to the user (e.g., invalid credentials)
      }
    } else {
      console.log("Login validation failed");
      // Optionally, show a message about validation failure (e.g., "Please fill in all fields")
    }
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw]">
        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`py-2 px-4 rounded-lg font-semibold ${activeTab === "signup" ? "bg-indigo-600" : "bg-gray-800"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 px-4 rounded-lg font-semibold ${activeTab === "login" ? "bg-indigo-600" : "bg-gray-800"}`}
          >
            Login
          </button>
        </div>

        {activeTab === "signup" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-indigo-100">Welcome</h1>
              <p className="mt-4 text-lg lg:text-xl text-gray-00">Fill in the details to get started!</p>
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
                <label className="block">
                  <span className="text-gray-300">Confirm Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <button
                  onClick={handleSignUp}
                  className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
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
                  className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
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

export default Auth
