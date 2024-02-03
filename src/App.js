import React, {useState} from 'react';
import './index.css';
import Header from './components/Header';
import MainList from './components/MainList';

export default function App() {
  const [notes, setNotes] = useState([{id: 1, title: '', text: '', bgColor: '#fdf2b3'}]);
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="app">
    Hello from github on the fly
      <Header isSaved={isSaved} setIsSaved={setIsSaved} notes={notes}/>
      <MainList notes={notes} setNotes={setNotes} setIsSaved={setIsSaved} />
    </div>
  )
}
