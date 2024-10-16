import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDisplay from './ProfileInfo';

const ContactContainer = ({ contacts = [], onSelectContact }) => {
  const [activeContact, setActiveContact] = useState(null);

  const handleSelectContact = (contact) => {
    setActiveContact(contact.id);
    onSelectContact(contact); // Pass the selected contact to the parent component
  };

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

      {/* Profile Display */}
      <div className="mt-4">
        <ProfileDisplay />
      </div>
    </div>
  );
};

export default ContactContainer;
