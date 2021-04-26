import React,{useEffect, useState} from 'react'
import{ Avatar}from '@material-ui/core'
import './sidebarChat.css'
import db from '../firebase'
import {Link} from 'react-router-dom'

const Sidebarchat = (props) => {
    const [seed,setSeed]= useState("")
    const [message,setMessage] = useState('')

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    useEffect(()=>{
      db.collection('rooms').doc(props.id)
       .collection('messages')
       .orderBy('timestamp' ,'desc')
       .onSnapshot((snapshot)=>
       setMessage(snapshot.docs.map((doc)=>
       doc.data()
       ))
       )
    },[props.id])

    const addingChat=()=>{
        const name = prompt("Enter name")

        if(name){
          db.collection('rooms').add({
            name:name
          })
        }
    }
  return !props.Addchat?(
    <Link to={`/home/${props.id}`} style={{textDecoration:'none',color:"black"}}>
    <div className='sidechat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`}/>
     <div className='sidebarchat_info'>
        <b><p className='sidename'>{props.name}</p></b> 
         <p>{message[0]?.message}</p>
     </div>
    </div>
    </Link>
  ):(
  <div className='chatHead' onClick={addingChat}><h4>Add new chat</h4></div>)
}

export default Sidebarchat
