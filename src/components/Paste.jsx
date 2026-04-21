import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Paste.css';
import { removeFromPastes } from "../Redux/PasteSlice";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector(state => state.paste.pastes);
  const [searchterm, setSearchterm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .catch((error) => console.log("Share error:", error));
    } else {
      navigator.clipboard.writeText(paste.content);
      alert("Content copied for sharing!");
    }
  }

  return (
    <div>
      <input
        className='search-input'
        type='search'
        placeholder='search here'
        value={searchterm}
        onChange={e => setSearchterm(e.target.value)}
      />
      <div className='card-css'>
        {filteredData.length > 0 &&
          filteredData.map(paste => (
            <div key={paste._id} className="paste-card">
              <div className="paste-title">{paste.title}</div>
              <div className="paste-content">{paste.content}</div>
              <div className="action-icons">
                <Link to={`/?pasteId=${paste._id}`}>Edit</Link>
                <Link to={`/pastes/${paste._id}`}>View</Link>
                <button onClick={() => handleShare(paste)}>Share</button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Copied to Clipboard");
                }}>Copy</button>
                <button onClick={() => handleDelete(paste._id)}>Delete</button>
              </div>
              <div>
                {new Date(paste.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Paste;
