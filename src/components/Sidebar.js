import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  //early return pattern
  if(!isMenuOpen) return null;
  
  return (
    <div className='p-5 shadow-lg w-36'>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li>Shorts</li>
      <li>Videos</li>
    </ul>
      <h1 className='font-bold'>Subscriptions</h1>
      <ul>
        <li>T-series</li>
        <li>Humgama</li>
        <li>MrBeast</li>
      </ul>
      <h1 className='font-bold'>Explore</h1>
      <ul>
        <li>Music</li>
        <li>Video</li>
        <li>Game</li>
      </ul>

    </div>
  )
}

export default Sidebar