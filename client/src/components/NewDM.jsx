import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { useState } from 'react';

const NewDM = () => {
  const [searchContacts, setsearchContacts] = useState([])
  const searchContact = async(searchTerm)=>{

  }
  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="text-white " onClick={()=>document.getElementById('my_modal_3').showModal()}><IoIosAdd  className=' text-white size-6'/></button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box h-80 ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-white flex justify-center pb-8 ">Please select contact</h3>
    <div>
    <label className="input input-bordered flex items-center gap-2 ">
  <input type="text " className="grow" placeholder="Search Contact" 
  onChange={e=>searchContact(e.target.value)}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>

    </div>
  </div>
  
</dialog>
 
    </>
  )
}

export default NewDM