import React, { useState } from 'react'

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signup")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Handle SignUp
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      // Send POST request to register the user
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstname: 'First', // Add firstname and other details as needed
          lastname: 'Last',
          image: 'default.jpg', // Placeholder image
          color: 'blue', // Default color
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign Up successful!");
      } else {
        alert(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert("Sign Up failed!");
    }
  }

  // Handle Login
  const handleLogin = async () => {
    try {
      // Send POST request to login the user
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem('token', data.token); // Store JWT in localStorage
      } else {
        alert(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Login failed!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
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
              <h1 className="text-4xl lg:text-5xl font-bold text-indigo-300">Welcome</h1>
              <p className="mt-4 text-lg lg:text-xl text-gray-300">Fill in the details to get started!</p>
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
  )
}

export default Auth
