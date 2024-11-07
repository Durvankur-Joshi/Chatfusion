import React, { useState } from 'react';
import { HOST } from '../utils/constants';

const MultiSelect = ({ contacts = [], selectedContacts, onToggleSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    (contact.label || contact.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="mb-4">
        <label className="flex items-center gap-2 bg-gray-700 rounded-lg p-2">
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
            placeholder="Search contacts..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-gray-400">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </label>
      </div>
      <div className="mt-4 mb-4">
        <h4 className="text-white font-semibold mb-2">Selected Contacts:</h4>
        <div className="flex gap-2 flex-wrap">
          {selectedContacts.map((contact) => (
            <span key={contact._id} className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm shadow">
              {contact.label} ({contact.email})
            </span>
          ))}
        </div>
      </div>
      <ul className="space-y-3">
      <div className = "overflow-y-auto max-h-64 hover:text-purple-700 p-2 rounded" style={{ maxHeight: '200px' }}>
        {filteredContacts.map((contact) => (
          <li
            key={contact._id}
            onClick={() => onToggleSelect(contact)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-150 
              ${selectedContacts.some((c) => c._id === contact._id) ? 'bg-purple-700' : 'hover:bg-gray-700'}
            `}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600">
              <img src={`${HOST}/${contact.image}`} alt={contact.label} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-medium">{contact.label}</p>
              <p className="text-gray-400 text-sm">{contact.email}</p>
            </div>
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
};

export default MultiSelect;
