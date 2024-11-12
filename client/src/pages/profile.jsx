import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAppStore } from '../store';
import { apiClient } from '../lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTES, UPDATE_PROFILE_ROUTES } from '../utils/constants';
import { FaTrashAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profileColor, setProfileColor] = useState('#ffffff');
  const [Image, setImage] = useState(null);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    gsap.from(".profile-card", { opacity: 0, y: 50, duration: 1, ease: "power2.out" });
    gsap.from(".profile-info", { opacity: 0, x: -50, duration: 1, delay: 0.5, ease: "power2.out" });
    gsap.from(".profile-image", { opacity: 0, scale: 0.8, duration: 1, delay: 1, ease: "power2.out" });
  }, []);

  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setProfileColor(userInfo.profileColor);
      setImage(userInfo.image);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstname || !lastname) {
      toast.error("Please fill all required fields!");
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
            firstname,
            lastname,
            profileColor,
            Image,
          },
          { withCredentials: true }
        );
  
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successfully!");
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Error updating profile.");
        console.error("Error updating profile:", error.response?.data || error.message);
      }
    }
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
  
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTES, formData, { withCredentials: true });

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image uploaded successfully");
      }
      const render = new FileReader();
      render.onload = () => {
        setImage(render.result);
      };
      render.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    toast.info("Image removed.");
  };

  const calculateProgress = () => {
    let progress = 0;
    if (firstname) progress += 50;
    if (lastname) progress += 50;
    return progress;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="profile-card bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw]">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-200 text-center mb-8">Complete Your Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 profile-info">
          <div className="flex flex-col items-center justify-center text-center mb-8 lg:mb-0">
            <div
              className="profile-image w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 hover:scale-110 transition-transform relative"
              style={{ backgroundColor: profileColor }}
            >
              {Image ? (
                <img src={Image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
              {Image && (
                <FaTrashAlt
                  onClick={handleDeleteImage}
                  className="cursor-pointer text-red-600 hover:text-red-700 text-2xl absolute top-1 right-1"
                />
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
              className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg font-bold hover:shadow-lg transition-shadow"
            >
              Upload Profile Image
            </label>
          </div>

          <div className="flex flex-col justify-center">
            <label className="block mb-4">
              <span className="text-gray-700">First Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Last Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-bold hover:shadow-lg transition-shadow"
            >
              Save Profile
            </button>

            <div className="text-center mt-4">
              <div className="text-gray-300 text-sm">Profile Completion: {calculateProgress()}%</div>
              <div className="h-4 w-full bg-gray-700 rounded-lg mt-2">
                <div
                  className="h-full bg-purple-500 rounded-lg"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Profile;
