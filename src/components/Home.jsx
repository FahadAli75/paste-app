import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../Redux/PasteSlice";


import './Home.css'
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes); 

  useEffect(() => {
      if (pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])

  function createPaste (){
    if (!title || !value) {
    toast.error("Title and Content is Empty!");
    return; // function yahin ruk jaata hai
  }
    const paste = {
       title: title,
       content : value,
       _id:pasteId ||
       Date.now().toString(36),
       createdAt:new Date().toISOString(),      
    }
    

  if (pasteId){
    // updated
    dispatch(updateToPastes(paste));
  } else {
    // paste
    dispatch(addToPastes(paste));
  }

  // after creation or updation
  setTitle('');
  setValue('')
  setSearchParams({});
}

  return (
    <div>
      <input  className='input-css'
      type='text'
      placeholder='Enter title here'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createPaste}
       className='btn-paste'>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
      <div className='TADiv-css'>
        <textarea className='textarea-css'
           value={value}
           placeholder='Enter Content Here...'
           onChange={(e)=> setValue(e.target.value)}
           rows={20}
        />
      </div>
    </div>
  )
}

export default Home
