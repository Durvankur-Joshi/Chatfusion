import React, { useState , useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ContactListComponent from "../components/contactListComponent.jsx"
import ProfileDisplay from './ProfileInfo';
import NewDM from './NewDM';
import { apiClient } from '../lib/api-client.js';
import { GET_DM_CONTACT_ROUTES } from '../utils/constants.js';
import { useAppStore } from '../store/index.js';


const ContactContainer = () => {
  const {setDirectMessagesContacts , directMessagesContacts} = useAppStore()
useEffect(() => {
  const getContacts = async ()=>
  {
    const response =  await apiClient.get(GET_DM_CONTACT_ROUTES,{
      withCredentials:true
    });
    if (response.data.contacts) {
      setDirectMessagesContacts(response.data.contacts)
    }
  }
  getContacts();
}, [])


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
          <ContactListComponent contacts ={directMessagesContacts}/>
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
