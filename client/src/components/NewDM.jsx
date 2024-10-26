import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Lottie  from 'lottie-react';
import noContactsAnimation from '../assets/Animation - 1729949663211.json'; // Update with your actual path

const NewDM = () => {
  const [searchContacts, setsearchContacts] = useState([]);
  
  const searchContact = async (searchTerm) => {
    // Here you would implement the logic to fetch or filter contacts based on searchTerm
    // For now, let's keep it as a placeholder
    if (searchTerm.trim() === "") {
      setsearchContacts([]); // Clear contacts if no search term
    } else {
      // Fetch or filter contacts and update `setsearchContacts` accordingly
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button 
        className="text-white" 
        onClick={() => document.getElementById('my_modal_3').showModal()}>
        <IoIosAdd className="text-white text-xl" />
      </button>

      {/* Modal dialog */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-96 ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-white flex justify-center mb-5">
            Please select contact
          </h3>
          
          {/* Search input */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow bg-gray-900 text-white p-2 rounded"
                placeholder="Search Username"
                onChange={e => searchContact(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          {/* Conditional rendering of Lottie animation */}
          <div className="flex justify-center items-center mt-5">
            {searchContacts.length === 0 ? (
              <Lottie 
                animationData={noContactsAnimation} 
                loop 
                className="h-40 w-40" 
              />
            ) : (
              <ul className="text-white mt-4">
                {searchContacts.map((contact, index) => (
                  <li key={index}>{contact.name}</li>
                ))}
              </ul>
            )}
          </div>
            <p className='flex justify-center font-bold text-2xl'>Explore Your <span className='pl-2 text-purple-600' >Network</span> </p>
        </div>
      </dialog>
    </>
  );
};

export default NewDM;
