import React from 'react'
import {Button} from '@material-ui/core'
import './login.css'
import {auth,provider} from '../firebase'
import {actionTypes} from './reducer'
import {useStateValue} from './StateProvider'

export const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider).then
        (result=>

            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
            )
          
        .catch((error)=>alert(error.message))
    }

    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://images.indianexpress.com/2015/02/whatsapp-security-tips.jpg' alt=''/>
                <div className='login_text'>
                    <h3>Sign In To Whatsapp</h3>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign In With Google
                </Button>

            </div>
            
        </div>
    )
}

export default Login