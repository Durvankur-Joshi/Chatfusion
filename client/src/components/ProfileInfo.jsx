import { useAppStore } from '../store'; // or wherever your store is located
import { HOST } from '../utils/constants';


const ProfileDisplay = () => {
  const { userInfo } = useAppStore(); // Access userInfo from global state

  return (
  //   <div
  //   className="profile-image w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden mb-4 hover:scale-110 transition-transform relative"
  //   style={{ backgroundColor: {`${HOST}/${userInfo.profileColor}`} }}
  // >

  <div>

    {userInfo.selectedAvatar ? (
      <img src={`${HOST}/${userInfo.selectedAvatar}`}
       alt="Avatar"
        className="w-full h-full object-cover" />
    ) : userInfo.profileImage ? (
      <img src={`${HOST}/${userInfo.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
    ) : (
      <span className="text-gray-500">No image</span>
    )}
    {/* {profileImage && (
      <FaTrashAlt
      onClick={handleDeleteImage}
      className="cursor-pointer text-red-600 hover:text-red-700 text-2xl absolute top-1 right-1"
      />
    )} */}

    <div>
      <img src={userInfo.profileImage} alt="" srcSet="" />
    </div>
    </div>
   
  // </div>
  );
};

export default ProfileDisplay;
