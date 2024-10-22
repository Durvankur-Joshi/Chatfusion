// import { useAppStore } from '../store'; // or wherever your store is located
// import { HOST } from '../utils/constants';


// const ProfileDisplay = () => {
//   const { userInfo } = useAppStore(); // Access userInfo from global state

//   return (
//   //   <div
//   //   className="profile-image w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 hover:scale-110 transition-transform relative"
//   //   style={{ backgroundColor: {`${HOST}/${userInfo.profileColor}`} }}
//   // >

//   <div>

//     {userInfo.selectedAvatar ? (
//       <img src={`${HOST}/${userInfo.selectedAvatar}`}
//        alt="Avatar"
//         className="w-full h-full object-cover" />
//     ) : userInfo.profileImage ? (
//       <img src={`${HOST}/${userInfo.image}`} alt="Profile" className="w-full h-full object-cover" />
//     ) : (
//       <span className="text-gray-500">No image</span>
//     )}
//     {/* {profileImage && (
//       <FaTrashAlt
//       onClick={handleDeleteImage}
//       className="cursor-pointer text-red-600 hover:text-red-700 text-2xl absolute top-1 right-1"
//       />
//     )} */}

//     <div>
//       <img src={userInfo.profileImage} alt="" srcSet="" />
//     </div>
//     </div>
   
//   // </div>
//   );
// };

// export default ProfileDisplay;
import React from 'react';
import { useAppStore } from '../store'; // import your Zustand store
import { HOST } from '../utils/constants';

const ProfileDisplay = () => {
  const { userInfo } = useAppStore(); // Access userInfo from the store

  return (
    <div className="profile-display flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 text-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-slate-200 text-center mb-8">Profile Details</h1>

        {/* Display Profile Image */}
        <div className="flex flex-col items-center">
          <div className="profile-image w-40 h-40 rounded-full bg-gray-300 overflow-hidden mb-4">
            {userInfo.image ? (
              <img src={`${HOST}/${userInfo.image}`} alt="User Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">No image</span>
            )}
          </div>

          {/* Display User's Name */}
          <div className="text-center">
            <p className="text-2xl">{userInfo.firstName} {userInfo.lastName}</p>
            <p className="text-gray-400">{userInfo.profileColor ? `Favorite Color: ${userInfo.profileColor}` : 'No color selected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
