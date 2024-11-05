import React, { useState } from 'react'
import { CloudUpload, Target } from 'lucide-react';

const UserProfile = () => {

const [isEdit,setIsEdit] = useState (false)
const [fName , setFName] = useState("john")
const [lName , setLName] = useState("conner")
const [editNumber , setEditNumber] = useState("0859508731")
const [editAddress , setEditAddress] = useState ("61 ถ.ไทนิยม อ.วังทองหลาง จ.เชียงราย 11920")

// image
const [file,setFile] = useState(null)
const [loading, setLoading] = useState(false)

const hdlSubmit = async (e) =>{
    e.preventDefault()
    setIsEdit(!isEdit)
}

const hdlImage = async (e) =>{
  try {
    setLoading(true)
    const img = new FormData()
    if (file) {
      body.append("image",file)
    }
  } catch (err) {
    console.log(err)
  }finally{
    setLoading(false)
  }
}




  return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <h1 className="text-xl font-semibold mb-6">{fName} {lName}</h1>
  
  {/* Upload Area */}
  <div className="mb-8 flex justify-center">
    <div className="w-[230px] h-[230px] rounded-full border-2 border-dashed border-green-400 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors">
      <div className="text-center">
        <CloudUpload className="w-8 h-8 mx-auto text-green-500 mb-2" />
        <p className="text-sm text-gray-500">Browse Files to upload</p>
      </div>
    </div>
  </div>

  {/* Form Fields */}
  <form className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        {isEdit ? (
        <input 
          value={fName}
          onChange={(e)=>setFName(e.target.value)}
          type="text"
          placeholder="Enter Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        ):(
          <p className='w-full px-3 py-2 font-semibold'>{fName}</p>
        )}


      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
         {isEdit ?(
           <input
           value={lName}
           onChange={(e)=>setLName(e.target.value)}
           type="text"
           placeholder="Enter Last Name"
           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
         />
          )
          :(
            <p className='w-full px-3 py-2 font-semibold'>{lName}</p>
          )
        }
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
      {isEdit ? (
        <input 
          value={editNumber}
          onChange={(e)=>setEditNumber(e.target.value)}
          type="tel"
          placeholder="Enter your phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />

      ) : (
        <p className=' w-full px-3 py-2'>{editNumber}</p>
        )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
      {isEdit
      ? (
        <textarea
          value={editAddress}
          onChange={setEditAddress} 
          placeholder="Enter Address"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />

      )
      :
      (
        <p className="w-full px-3 py-2">{editAddress}</p>
      )
      }
    </div>

    <div className="flex space-x-4">
      <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      type='submit'
      onClick={hdlSubmit}
      >
      {isEdit ? "Save" : "Edit"   }
      
      </button>
      <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
        Delete Profile
      </button>
    </div>
  </form>
</div>
;
}

export default UserProfile