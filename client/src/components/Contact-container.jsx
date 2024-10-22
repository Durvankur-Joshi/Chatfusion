import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDisplay from './ProfileInfo';
import ProfileInfo from './ProfileInfo';

const ContactContainer = ({ contacts = [], onSelectContact }) => {
  const [activeContact, setActiveContact] = useState(null);

  const handleSelectContact = (contact) => {
    setActiveContact(contact.id);
    onSelectContact(contact); // Pass the selected contact to the parent component

  };

  const logout = async () =>{

  }

  return (
    <div className="h-full bg-gray-900 p-4 overflow-y-auto flex flex-col">
      <div className="mb-4 text-center">
        <h5 className="text-2xl md:text-3xl font-bold text-slate-200">ChatFusion</h5>
      </div>


      <div className="flex-1 space-y-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors ${activeContact === contact.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                } hover:bg-blue-100 hover:text-blue-700`}
              onClick={() => handleSelectContact(contact)}
            >
              {/* Contact Icon */}
              <FaUserCircle className="text-3xl mr-3" />

              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage || 'No messages yet'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No contacts available.</p>
        )}
      </div>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Logout
      </button>

      {/* Profile Display */}
      <div>
      <h1>Welcome to the Dashboard</h1>
      <ProfileDisplay />
    </div>
    </div>
  );
};

export default ContactContainer;












// ContactContainer.jsx
// import React, { useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useAppStore } from '../store'; // Import the store
// import { useNavigate } from 'react-router-dom'; // To handle redirection

// const ContactContainer = ({ contacts = [], onSelectContact }) => {
//   const [activeContact, setActiveContact] = useState(null);
//   const { logout } = useAppStore(); // Get the logout function from the store
//   const navigate = useNavigate(); // Hook for navigation

//   const handleSelectContact = (contact) => {
//     setActiveContact(contact.id);
//     onSelectContact(contact); // Pass the selected contact to the parent component
//   };

//   // Handle logout
//   const handleLogout = () => {
//     logout(); // Clear the user data
//     navigate('/login'); // Redirect to the login page
//   };

//   return (
//     <div className="h-full bg-gray-900 p-4 overflow-y-auto flex flex-col">
//       <div className="mb-4 text-center">
//         <h5 className="text-2xl md:text-3xl font-bold text-slate-200">ChatFusion</h5>
//       </div>

//       <div className="flex-1 space-y-2">
//         {contacts.length > 0 ? (
//           contacts.map((contact) => (
//             <div
//               key={contact.id}
//               className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors ${activeContact === contact.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
//                 } hover:bg-blue-100 hover:text-blue-700`}
//               onClick={() => handleSelectContact(contact)}
//             >
//               {/* Contact Icon */}
//               <FaUserCircle className="text-3xl mr-3" />

//               {/* Contact Details */}
//               <div>
//                 <h3 className="text-lg font-semibold">{contact.name}</h3>
//                 <p className="text-sm text-gray-500">{contact.lastMessage || 'No messages yet'}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-sm text-center">No contacts available.</p>
//         )}
//       </div>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default ContactContainer;
