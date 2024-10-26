import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import ProfileDisplay from './ProfileInfo';
import NewDM from './NewDM';


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
      <div className='gird '>
        <div className='flex items-center justify-between gap-6'>
         <h6>Direct Message</h6>
         <NewDM/>
        </div>
        <div>
         <h6 className="flex items-center justify-between ">Channel</h6>
        </div>
      </div>

      {/* Profile Display */}
      <div>
        <ProfileDisplay />
      </div>
    </div>
  );
};

export default ContactContainer;
