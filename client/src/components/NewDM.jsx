import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Lottie from 'lottie-react';
import noContactsAnimation from '../assets/Animation - 1729949663211.json'; // Update with your actual path
import { apiClient } from '../lib/api-client';
import { SEARCH_CONTACT } from '../utils/constants';
import { HOST } from '../utils/constants';

const NewDM = () => {
  const [searchContacts, setSearchContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(SEARCH_CONTACT, { searchTerm }, { withCredentials: true });
        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        }
      } else {
        setSearchContacts([]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        className="text-white text-2xl hover:text-gray-300 transition"
        onClick={() => document.getElementById('my_modal_3').showModal()}>
        <IoIosAdd />
      </button>

      {/* Modal dialog */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-auto max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-white text-center mb-5">Please select contact</h3>

          {/* Search input */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow bg-gray-900 text-white p-2 rounded"
                placeholder="Search Username"
                onChange={(e) => searchContact(e.target.value)}
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

          {/* Conditional rendering for loading, error, no contacts, or showing contacts */}
          <div className="flex flex-col items-center mt-5">
            {searchContacts.length === 0 ? (
              <div className='flex justify-center items-center'>
                <Lottie animationData={noContactsAnimation} loop className="h-40 w-40" />
              </div>
            ) : (
              <ul className="text-white mt-4 space-y-2">
                {searchContacts.map((contact, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className='relative h-12 w-12 sm:h-16 sm:w-16 md:h-16 md:w-16 rounded-full overflow-hidden'>
                      <img
                        src={`${HOST}/${contact.image}`}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className='font-semibold'>{contact.firstname}</p>
                      <p className='text-sm text-gray-400'>{contact.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className='flex justify-center font-bold text-2xl mt-4'>
            Explore Your <span className='pl-2 text-purple-600'>Network</span>
          </p>
        </div>
      </dialog>
    </>
  );
};

export default NewDM;
