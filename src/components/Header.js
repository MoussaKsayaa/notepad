import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free'
import {library} from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
library.add(far,fas,fab);

function SaveButton({isSaved, setIsSaved, notes}) {
  const handleSaveClick = () => {
    if (!isSaved) {
      window.localStorage.setItem('savedNotes', JSON.stringify(notes));
      setIsSaved(true);
    }
  }
  return (
    <div className={`save-icon ${!isSaved ? 'active' : ''}`} onClick={handleSaveClick}>
      <FontAwesomeIcon icon='fa-regular fa-floppy-disk' bounce={!isSaved ? true : false} />
    </div>
  )
}

export default function Header({isSaved, setIsSaved, notes}) {
  return (
    <div className="header">
      <div className='container'>
          <div className='icon'>
            <i className="fa-solid fa-bars"></i>
          </div>
          <h1>Notes</h1>
          <SaveButton isSaved={isSaved} setIsSaved={setIsSaved} notes={notes} />
          <div className='nav'></div>
      </div>
    </div>
  )
}