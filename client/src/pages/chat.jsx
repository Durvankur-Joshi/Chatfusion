import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      // Alert if profile is incomplete
      alert("Please complete your profile");
      // Navigate to the profile page instead
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return <div>Loading user info...<span className="loading loading-ring loading-lg"></span></div>;
    
  }

  return (
    <div>
      <h1>Welcome to the chat, {userInfo.firstName}</h1>
      {/* Chat content */}
    </div>
  );
};

export default Chat;
