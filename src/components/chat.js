import React,{useEffect,useState} from 'react'
import{ Avatar, IconButton}from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import './chat.css'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom'
import db from '../firebase'
import {useStateValue} from './StateProvider'
import firebase from 'firebase'

const Chat = () => {
    const [seed,setSeed]= useState("")
    const [input,setInput] =useState('')
    const {roomid} = useParams()
    const [roomName, setRoomName] = useState('')
    const [message,setMessage] = useState('')

    const [{user},dispatch] = useStateValue()

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    useEffect(()=>{
       db.collection('rooms').doc(roomid).onSnapshot((snapshot)=>{
            setRoomName(snapshot.data().name)
       })
     
       db.collection('rooms').doc(roomid)
       .collection('messages')
       .orderBy('timestamp' ,'asc')
       .onSnapshot((snapshot)=>
    //    console.log('ll',snapshot)
       setMessage(snapshot.docs.map((doc)=>
      
       doc.data()
       ))
       )
    },[roomid])

    const sendMessage =(e)=>{
        e.preventDefault()
        db.collection('rooms').doc(roomid)
        .collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue
            .serverTimestamp()
        })
        setInput('')
    }

  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`}/>
            <div className='chatheader_info'>
               <b> <p className='chatername'>{roomName}</p></b>
                <p className='para'>last seen {""}
                {new Date(message[message.length - 1]?.
                    timestamp?.toDate()).toUTCString()} </p>
            </div>
            <div className='chatheader_right'>
            <IconButton/>
            <SearchIcon/>
            <IconButton/>
            <IconButton/>
            <AttachFileIcon/>
            <IconButton/>
            <IconButton/>
            <MoreVertIcon/>
            <IconButton/>
            </div>
        </div>
        <div className='chat_body'>
            {message && message.map((msg=>(
                <div className={`chat_msg ${msg.name === user.displayName && "chat_reciver"}`}>
                <span className='chat_name'>
                {msg.name} </span>
                <span className='msg'>{msg.message}</span>
                <span className='time_stamp'>
                    {new Date(msg.timestamp?.toDate()).toUTCString()}</span>
            </div>
            )))}
            
            {/* <div className='chat_msg'>
            <p>i am ramya</p> </div> */}
        </div>
        <div className='chat_footer'>
            <SentimentSatisfiedOutlinedIcon/>
            <form>
                <input type='text' 
                placeholder='type a message' 
                value={input} 
                onChange={e => setInput(e.target.value)}/>
                <MicIcon/>
                < SendIcon/>
                < button onClick={sendMessage} type="submit">send</button>
            </form>
        </div>

      
    </div>
  )
}

export default Chat
