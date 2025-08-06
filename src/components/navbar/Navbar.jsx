import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode , ToggleSidebar} from '../../redux/uiSlice';
import "./navbar.css"

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const isSidebar = useSelector((state) => state.ui.isSidebar)

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleSidebarToggle = () =>{
    dispatch(ToggleSidebar())
  }

  return (
    <nav className={`navbar${darkMode ? ' dark' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-content">
        <div className="navbar-logo">
          CAT-GPT
        </div>
        <div className='navbar-buttons'>
        <button
          onClick={handleToggle}
          className="navbar-toggle"
          aria-pressed={darkMode}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button
          onClick={handleSidebarToggle}
          className="navbar-toggle"
        >
          {isSidebar ? 'Close' : 'Open'}
        </button>

        </div>

      </div>
    </nav>
  );
}
