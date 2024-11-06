import React, { useState, useRef, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import Lottie from 'lottie-react';
import noContactsAnimation from '../assets/Animation - 1729949663211.json'; 
import { apiClient } from '../lib/api-client';
import { SEARCH_CONTACT, HOST, GET_ALL_CONTACT_ROUTES } from '../utils/constants';
import { useAppStore } from '../store';
import MultiSelect from "./MultiSelect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [searchContacts, setSearchContacts] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACT_ROUTES, { withCredentials: true });
      console.log(response.data.contacts)
      setAllContacts(response.data.contacts);
      setLoading(false);
    };
    getData();
  }, []);

  const createChannel = () => {
    // Logic for creating channel goes here
  };

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <>
      {/* Button to open modal */}
      <button
        className="text-white text-2xl hover:text-gray-300 transition"
        onClick={() => modalRef.current?.showModal()}>
        <IoIosAdd />
      </button>

      {/* Modal dialog */}
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box h-auto max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-white text-center mb-5">Create New Channel</h3>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow bg-gray-900 text-white p-2 rounded"
                placeholder="ChannelName"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
              />
            </label>
            <div>
              <MultiSelect
              className=""
                contacts={allContacts}  // Corrected prop
                selectedContacts={selectedContacts}  // Corrected prop
                onToggleSelect={(contact) => {
                  setSelectedContacts(prev => {
                    if (prev.includes(contact)) {
                      return prev.filter(c => c !== contact);
                    } else {
                      return [...prev, contact];
                    }
                  });
                }}
              />
            </div>
            <div>
              <button
                className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 text-white mt-5 rounded-lg h-9"
                onClick={createChannel}>
                Create Channel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateChannel;
