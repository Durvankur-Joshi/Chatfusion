import React from 'react';
import { useAppStore } from '../store';
import { HOST } from '../utils/constants';
import { MdOutlineGroups } from "react-icons/md";

const ContactListComponent = ({ contacts, isChannel = false }) => {
    const { setSelectedChatData, setSelectedChatType, setSelectedChatMessage, selectedChatData, } = useAppStore();

    const handleClick = (contact) => {
        if (isChannel) {
            setSelectedChatType("channel");
        } else {
            setSelectedChatType("contact");
        }
        setSelectedChatData(contact);
        console.log("Selected chat type:", isChannel ? "channel" : "contact", contact);
    
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessage([]);
        }
    };
    


    return (
        <div className="mt-5 ">
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className={`flex items-center  rounded-lg cursor-pointer w-full  pl-3 h-16
                        ${selectedChatData && selectedChatData._id === contact._id
                            ? "bg-purple-600 text-white"
                            : ""}`
                    }
                    onClick={() => handleClick(contact)}
                >
                    {/* Profile Image */}
                    {/* <div className="relative flex-shrink-0 h-5 w-5 sm:h-14 sm:w-14 md:h-10 md:w-10 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src={contact.image ? `${HOST}/${contact.image}` : "" }
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = ""; }} // fallback image
                        />
                    </div> */}
                    <div className="relative flex-shrink-0 h-5 w-5 sm:h-14 sm:w-14 md:h-10 md:w-10 rounded-full overflow-hidden border border-gray-300 bg-gray-600 flex items-center justify-center">
    {contact.image ? (
        <img
            src={`${HOST}/${contact.image}`}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = ""; }} // fallback image
        />
    ) : (
        <span className="text-gray-950 font-bold text-sm sm:text-lg md:text-base">
            {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
        </span>
    )}
</div>

                    {/* <div className="relative flex-shrink-0 h-5 w-5 sm:h-14 sm:w-14 md:h-10 md:w-10 rounded-full overflow-hidden border border-gray-300 bg-gray-600 flex items-center justify-center">
                        {contact.image ? (
                            <img
                                src={`${HOST}/${contact.image}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = ""; }} // fallback image
                            />
                        ) : (
                            <span className="text-gray-950 font-bold text-sm sm:text-lg md:text-base">
                                {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
                            </span>
                        )}
                    </div> */}


                    {/* Contact Information */}
                    <div className="flex-1 min-w-0 pl-3">
                        <p className="text-sm sm:text-base md:text-lg font-semibold truncate">
                            {contact.firstname || contact.name || "Unknown User"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactListComponent;
