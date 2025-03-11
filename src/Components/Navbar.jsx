import React, { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-link">
          <div className='NewsMonkey'>NewsMonkey</div>
          <div className='Home'><a href='/Home'>Home</a></div>
          <div className='About'><a href='/About'>About</a></div>
          {/* <div className='Contact'><a href='/Contact'>Contact</a></div> */}
          <div className='Contact'><a href='/general'>General</a></div>
          <div className='Contact'><a href='/business'>Business</a></div>
          <div className='Contact'><a href='/Entertainment'>Entertainment</a></div>
          <div className='Contact'><a href='/health'>Health</a></div>
          <div className='Contact'><a href='/science'>Science</a></div>
          <div className='Contact'><a href='/sports'>Sports</a></div>
          <div className='Contact'><a href='/technology'>Technology</a></div>
          
        </div>
        <div className="nav-action">
          <input
            className="search"
            value={query}
            placeholder="Search"
            onChange={handleInputChange}
          />
          <button className="submit" onClick={handleSearch}>Search</button>
        </div>
      </nav>
    </div>
  );
}