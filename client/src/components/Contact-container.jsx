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
    <div className="h-full sm:h-screen bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto flex flex-col">
      {/* App Title */}
      <div className="mb-4 text-center">
        <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200">ChatFusion</h5>
      </div>

      {/* Contacts List */}
      <div className="flex-1 space-y-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-2 sm:p-3 cursor-pointer rounded-lg transition-colors ${activeContact === contact.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                } hover:bg-blue-100 hover:text-blue-700`}
              onClick={() => handleSelectContact(contact)}
            >
              {/* Contact Icon */}
              <FaUserCircle className="text-2xl sm:text-3xl mr-2 sm:mr-3" />

              {/* Contact Details */}
              <div>
                <h3 className="text-sm sm:text-lg font-semibold">{contact.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{contact.lastMessage || 'No messages yet'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xs sm:text-sm text-center">No contacts available.</p>
        )}
      </div>

      {/* Profile Display */}
      <div>
        <ProfileDisplay />
      </div>
    </div>
  );
};

export default ContactContainer;
