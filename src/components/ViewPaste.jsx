
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../Redux/PasteSlice";

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div>
      <input  className='input-css'
      type='text'
      placeholder='Enter title here'
      value={paste.title}
      disabled
      onChange={(e) => setTitle(e.target.value)}
      />
     
      <div className='TADiv-css'>
        <textarea className='textarea-css'
           value={paste.content}
           disabled
           placeholder='Enter Content Here...'
           onChange={(e)=> setValue(e.target.value)}
           rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
