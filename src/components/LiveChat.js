import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';
import store from '../utils/store';
import { generateRandomNames, makeRandomMessage } from '../utils/helper';


const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector(store => store.chat.messages);
  const [liveMessage, setLiveMessage]= useState("");

  useEffect(() => {
    const i = setInterval((

    ) => {
      // API polling
      dispatch(addMessage({
        name: generateRandomNames(),
        message: makeRandomMessage(15),
      }));
    }, 2000);


    return () => clearInterval();
  }, [])

  return (<div>
    <div className='w-full h-[400px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
     {
      chatMessages.map((c, i)=><ChatMessage key={i} name={c.name} message={c.message} />)
      }
      
      
    </div>
    <form className='w-full p-2 m-2 border border-black' onSubmit={(e)=> {
      e.preventDefault();
      dispatch(addMessage({
        name: "Pragya",
        message: liveMessage
      }));
      setLiveMessage("");
    }}>
      <input className='px-2 border border-black w-[70%]' type='text' value={liveMessage} onChange={(e)=> {
        setLiveMessage(e.target.value);
      }}/>
      <button className='px-2 mx-2 bg-green-100'>Send</button>
    </form>
    </div>
  )
}

export default LiveChat