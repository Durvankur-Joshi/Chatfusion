import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAppStore } from '../store';
import { apiClient } from '../lib/api-client';
import { UPDATE_PROFILE_ROUTES } from '../utils/constants';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileColor, setProfileColor] = useState('#ffffff');
  const [profileImage, setProfileImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    gsap.from(".profile-card", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
    gsap.from(".profile-info", { opacity: 0, x: -50, duration: 1, delay: 0.5, ease: "power2.out" });
    gsap.from(".profile-image", { opacity: 0, scale: 0.8, duration: 1, delay: 1, ease: "power2.out" });
  }, []);

  const validateProfile = () => {
    if (!firstName) {
      return false;
    }
    if (!lastName) {
      return false;
    }
    return true;
  };

  const handleProfileSave = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTES,
          {
            firstName,
            lastName,
            profileColor,
          },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          setShowToast(true); // Show toast notification
          setTimeout(() => {
            navigate("/chat");
          }, 2000); // Delay navigation to allow the toast to be seen
        }
      } catch (error) {
        console.error("Error updating profile:", error.response?.data || error.message);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const calculateProgress = () => {
    let progress = 0;
    if (firstName) progress += 30;
    if (lastName) progress += 30;
    if (profileImage) progress += 40;
    return progress;
  };

  useEffect(() => {
    if (showToast) {
      gsap.fromTo(".toast", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 });
      const timer = setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="profile-card bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw]">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 text-center mb-8">Complete Your Profile</h1>

        <div className="grid lg:grid-cols-2 gap-8 profile-info">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="profile-image w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 hover:scale-110 transition-transform"
              style={{ backgroundColor: profileColor }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageUpload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="profileImageUpload"
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-bold hover:shadow-lg transition-shadow"
            >
              Upload Profile Image
            </label>
          </div>

          {/* Profile Info Form */}
          <div className="flex flex-col justify-center">
            <label className="block mb-4">
              <span className="text-gray-700">First Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Last Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="block mb-6">
              <span className="text-gray-700">Profile Color</span>
              <input
                type="color"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300"
                value={profileColor}
                onChange={(e) => setProfileColor(e.target.value)}
              />
            </label>

            <button
              onClick={handleProfileSave}
              className="w-full py-2 mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 hover:shadow-lg transition-shadow"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-1.5 mb-4 mt-5">
          <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
        </div>

        {/* Toast Notification */}
        
      </div>
      {showToast && (
          <div className="toast fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg w-72">
            Profile saved successfully!
          </div>
        )}
    </div>
  );
};

export default Profile;
