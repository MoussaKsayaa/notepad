import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free'
import {library} from '@fortawesome/fontawesome-svg-core'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
library.add(far,fas,fab);


function Note({myId, notes, setNotes, currentNote, setIsSaved, myColor}) {
  function handleChange(e, val) {
    setNotes((prevNotes) => prevNotes.map(n => n.id === currentNote.id ? {...n, [val]: e} : n ));
    setIsSaved(false);
  }
  const handleRemoveBtnClick = (e) => {
    const currentId = e.currentTarget.parentElement.getAttribute('myid');
    setNotes(notes.filter(n => +n.id !== +currentId));
    setIsSaved(false);
  } 
  return (
    <div className='note' myid={myId} style={{backgroundColor: myColor}}>
      <input type='text' placeholder='Title' value={currentNote.title} onChange={e => handleChange(e.target.value, 'title')} />
      <textarea placeholder='type text..' value={currentNote.text} onChange={e => handleChange(e.target.value, 'text')} ></textarea>
      <div className="remove-icon" onClick={e => handleRemoveBtnClick(e)}>
      <FontAwesomeIcon icon="fa-regular fa-trash-can" />
      </div>
    </div>
  )
}

function NewNote({notes, setNotes, setIsSaved}) {
  function handleClick() {
    const myColor = giveMeColor();
    if (notes.length === 0) return setNotes([{id: 1, title: '', text: '', bgColor: myColor}]);
    if (notes[notes.length-1].title.trim().length > 0) {
      const theId = notes.map((n, i) => i+1 === notes.length ? n.id+1 : '').join('');
      setNotes((theNotes) => [...theNotes, {id: +theId, title: '', text: '', bgColor: myColor}]);
      setIsSaved(false);
    }
  }
  return (
    <>
    <div className='add-note' onClick={handleClick}>
    <FontAwesomeIcon icon="fa-solid fa-plus" />
    </div>
    </>
  )
}

function giveMeColor() {
  const colors = ['fdf2b3', 'd1eaed', 'ffdada', 'ffd4a9'];
  const randomNum = Math.floor(Math.random()*colors.length);
  const theColor = '#' + colors[randomNum]
  return theColor;
}

export default function MainList({notes, setNotes, setIsSaved}) {
  window.onload = () => {
    let savedNotes = JSON.parse(window.localStorage.getItem('savedNotes'));
    if (savedNotes !== null && savedNotes.length !== 0) {
      setNotes(savedNotes);
    }
    setIsSaved(true);
  }
  let notesList = [];
  notes.map((note) => {
    return notesList.push(
    <Note key={note.id} myId={note.id} notes={notes} setNotes={setNotes} currentNote={note} setIsSaved={setIsSaved} myColor={note.bgColor} />
  )})
  return (
    <div className='main-list'>
      <div className='container'>
        <div className='notes'>
          {notesList}
          <NewNote notes={notes} setNotes={setNotes} setIsSaved={setIsSaved} />
        </div>
      </div>
    </div>
  )
}