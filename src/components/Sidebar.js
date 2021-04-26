import React, { useState,useEffect } from 'react'
import './sidebar.css'
import{ Avatar, IconButton }from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './Sidebarchat'
import db from '../firebase'
import {useStateValue} from './StateProvider'


const Sidebar = () => {
  const [rooms,setRooms] = useState()
  const [{user},dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe =db.collection('rooms')
    db.collectionGroup('rooms').onSnapshot((snapshot)=>
    setRooms(snapshot.docs.map((doc)=>({
        id:doc.id,
        data:doc.data()
    }))
    ))

    return()=>{
      unsubscribe()
    }
  }, [])

  return (
    <div className='sidebar'>
        
        <div className='sidebar_header'>
        <Avatar src={user?.photoURL}/>
       <div className='sidebar_headerRight'>
           <IconButton/>
            <DonutLargeIcon/>
            <IconButton/>
            <IconButton/>
            <ChatIcon/>
            <IconButton/>
            <IconButton/>
            <MoreVertIcon/>
            <IconButton/>
            </div>
        </div>
        <div className='sidebar_search'>
          <div className='search_container'>
          <SearchIcon/>
          <input type='text' placeholder='Search here'/>
          </div>
        </div>
        <div className='sidebar_chats'>
          <SidebarChat Addchat/>
          {rooms && rooms.map((room)=>(
            <SidebarChat key={room.id} id={room.id} 
            name={room.data.name}/>
          ))}
          
          
        </div>

      
    </div>
  )
}

export default Sidebar
