import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center'>
        <img className="w-6 h-6" alt="user icon" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
        <span className="font-semibold px-2">{name}</span>
        <span>{message}</span>
    </div>
  )
}

export default ChatMessage