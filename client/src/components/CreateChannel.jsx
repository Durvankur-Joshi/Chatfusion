import React, { useState, useRef, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { apiClient } from '../lib/api-client';
import { GET_ALL_CONTACT_ROUTES, CREATE_CHANNEL_ROUTES } from '../utils/constants';
import { useAppStore } from '../store';
import MultiSelect from './MultiSelect';

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addChannel } = useAppStore();
  const [channelName, setChannelName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACT_ROUTES, { withCredentials: true });
        setAllContacts(response.data.contacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const createChannel = async () => {
    try {
      if (channelName && selectedContacts.length) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTES,
          {
            name: channelName,
            members: selectedContacts.map((contact) => contact._id),
          },
          { withCredentials: true }
        );

        if (response.status === 201 && response.data.channel) {
          setChannelName('');
          setSelectedContacts([]);
          addChannel(response.data.channel);
        } else {
          console.log('Failed to create channel:', response.data);
        }
      } else {
        console.log('Channel name and contacts are required.');
      }
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <>
      <button
        className="text-white text-2xl hover:text-gray-300 transition"
        onClick={() => modalRef.current?.showModal()}
      >
        <IoIosAdd />
      </button>

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
                placeholder="Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
              />
            </label>
           

            <MultiSelect
              contacts={allContacts}
              selectedContacts={selectedContacts}
              onToggleSelect={(contact) => {
                setSelectedContacts((prev) =>
                  prev.some((c) => c._id === contact._id)
                ? prev.filter((c) => c._id !== contact._id)
                : [...prev, contact]
                );
              }}
              />
             
            <button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 text-white mt-5 rounded-lg h-9"
              onClick={createChannel}
            >
              Create Channel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateChannel;
