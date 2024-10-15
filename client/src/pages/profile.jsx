import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAppStore } from '../store';
import { apiClient } from '../lib/api-client';
import { UPDATE_PROFILE_ROUTES } from '../utils/constants';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon from react-icons

// Predefined avatars
const avatars = [
  'https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
];

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileColor, setProfileColor] = useState('#ffffff');
  const [profileImage, setProfileImage] = useState(null); // Initialize with null
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Track selected avatar
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    gsap.from(".profile-card", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
    gsap.from(".profile-info", { opacity: 0, x: -50, duration: 1, delay: 0.5, ease: "power2.out" });
    gsap.from(".profile-image", { opacity: 0, scale: 0.8, duration: 1, delay: 1, ease: "power2.out" });
  }, []);

  const validateProfile = () => {
    if (!firstName || !lastName) {
      setShowToast(true);
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
            profileImage: selectedAvatar || profileImage, // Use avatar or uploaded image
          },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          navigate("/chat");
        }
      } catch (error) {
        console.error("Error updating profile:", error.response?.data || error.message);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(null); // Reset avatar selection when custom image is uploaded
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setProfileImage(null); // Clear custom image if an avatar is selected
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setSelectedAvatar(null); // Reset selected avatar as well
  };

  const calculateProgress = () => {
    let progress = 0;
    if (firstName) progress += 30;
    if (lastName) progress += 30;
    if (profileImage || selectedAvatar) progress += 40;
    return progress;
  };

  useEffect(() => {
    if (showToast) {
      gsap.fromTo(".toast", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="profile-card bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw]">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-200 text-center mb-8">Complete Your Profile</h1>

        <div className="grid lg:grid-cols-2 gap-8 profile-info">
          {/* Profile Image/Avatar Selection */}
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="profile-image w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 hover:scale-110 transition-transform relative"
              style={{ backgroundColor: profileColor }}
            >
              {selectedAvatar ? (
                <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">No image</span>
              )}

              {/* Delete Icon positioned on the corner */}

            </div>
            <div>
              {profileImage && (
                <FaTrashAlt
                  onClick={handleDeleteImage}
                  className="cursor-pointer text-red-600 hover:text-red-700 text-2xl absolute top-1 right-1 md:top-2 md:right-2 lg:top-2 lg:right-2 xl:top-2 xl:right-2"
                />
              )}

            </div>

            {/* Upload Image */}
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

            {/* Avatar Selection */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`w-16 h-16 rounded-full cursor-pointer hover:scale-105 transition-transform ${selectedAvatar === avatar ? 'ring-4 ring-blue-500' : ''
                    }`}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
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
        {showToast && (
          <div className="toast fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg transition-opacity duration-500">
            Please fill in all fields!
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
