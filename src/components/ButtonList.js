import React from 'react'
import Button from './Button'

const list = ["All", "Gaming", "Movie", "Anime", "Live", "Bhajan", "Cricket", "GMMTV", "Party", "MrBeast"]

const ButtonList = () => {
  return (
    <div className='flex'>
        {list.map((value) => <Button key={value} name={value}/>) }
    </div>
  )
}

export default ButtonList