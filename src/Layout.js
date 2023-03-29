import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import NoteList from "./NoteList";
import { v4 as uuidv4 } from "uuid";
import { currentDate } from "./utils";
import { GoogleLogin } from '@react-oauth/google';

const localStorageKey = "lotion-v1";

function Layout() {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const [collapse, setCollapse] = useState(true);
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // new state variable
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  
  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    const height = mainContainerRef.current.offsetHeight;
    mainContainerRef.current.style.maxHeight = `${height}px`;
    const existing = localStorage.getItem(localStorageKey);
    if (existing) {
      try {
        setNotes(JSON.parse(existing));
      } catch {
        setNotes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (currentNote < 0) {
      return;
    }
    if (!editMode) {
      navigate(`/notes/${currentNote + 1}`);
      return;
    }
    navigate(`/notes/${currentNote + 1}/edit`);
  }, [notes]);

  const saveNote = (note, index) => {
    note.body = note.body.replaceAll("<p><br></p>", "");
    setNotes([
      ...notes.slice(0, index),
      { ...note },
      ...notes.slice(index + 1),
    ]);
    setCurrentNote(index);
    setEditMode(false);
  };

  const deleteNote = (index) => {
    setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
    setCurrentNote(0);
    setEditMode(false);
  };

  const addNote = () => {
    setNotes([
      {
        id: uuidv4(),
        title: "Untitled",
        body: "",
        when: currentDate(),
      },
      ...notes,
    ]);
    setEditMode(true);
    setCurrentNote(0);
  };

  

  const responseMessage = (response) => {
    console.log(response);
    setIsLoggedIn(true);
  };
  


  return (
      <div id="container">
        <header>
          <aside>
            <button id="menu-button" onClick={() => setCollapse(!collapse)}>
              &#9776;
            </button>
          </aside>
          <div id="app-header">
            <h1>
              <Link to="/notes">Lotion</Link>
            </h1>
            <h6 id="app-moto">Like Notion, but worse.</h6>
          </div>
          <aside>&nbsp;</aside>
          {isLoggedIn && (
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
          )}

        </header>

        <div id="main-container" ref={mainContainerRef}>
          <aside id="sidebar" className={collapse ? "hidden" : null}>
            <header>
              <div id="notes-list-heading">
                <h2>Notes</h2>
                <button id="new-note-button" onClick={addNote}>
                  +
                </button>
              </div>
            </header>
            <div id="notes-holder">
              <NoteList notes={notes} />
            </div>
          </aside>
          {isLoggedIn ? (
            <div id="write-box">
              <Outlet context={[notes, saveNote, deleteNote]} />
            </div>  
          ) : (
              
            <div id = "google-login-container">
              <h2 id="google-login-header">Google Login</h2>
              
              <div id="google-login-button">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
              </div>
            </div>
          )}
        </div>
        
      </div>
    );
          
}
        
export default Layout;