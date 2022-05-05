import React from 'react';
import { Link } from 'react-router-dom';

import './index.css'

export default function Header({ navigations }) {


  return (
    <header className="header">
      <div className='logo'>
        <i className="fa-solid fa-comments"></i>
      </div>
      <nav className='primary-nav'>
        <ul className='nav-items'>
          {
            navigations.map((item) => (
              <li className='nav-item' key={item.label}>
                <Link to={item.path + ('?' + item.queryStr || '')} className='nav-link'> {item.label} </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}
