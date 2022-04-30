import React from 'react';

import './App.css';


const primaryNavigation = ['Home', 'Chat', 'Contact US', 'SignIn']


function App() {
  return (
    <div className="Chat-App">
      <header className="header">
        <div className='logo'>
          <i className="fa-solid fa-comments"></i>
        </div>
        <nav className='primary-nav'>
          <ul className='nav-items'>
            {primaryNavigation.map((item) => (
              <li className='nav-item' key={item}>{item}</li>
            ))}
          </ul>
        </nav>
      </header>

      <div className='App-Body'>

        <div className='chat-wrapper'>
          <div className='chat-container'>
            {/* 1st column */}
            <div className='col col-1 main-navigation'></div>
            {/* 2nd column */}
            <div className='col col-2 users-listing'></div>
            {/* 3rd column */}
            <div className='col col-3 chat-room'></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
