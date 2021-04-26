import React from 'react'
import Sidebar from './Sidebar'
import './app.css'
import Chat from './chat'
import {BrowserRouter as Router,Switch,Route }from 'react-router-dom'
import Login from './Login'
import {useStateValue} from './StateProvider'

const App = () => {
  const [{user},dispatch] = useStateValue()
  return (
    <>
    {!user?
    <h2>
      <Login/>
      </h2>:
    <div className='app'>
        {/* <h1>Whats app clone</h1> */}
        <div className='app_display'>
          <Router>
          <Sidebar/>
            <Switch>
              <Route path='/home/:roomid'>
               
                <Chat/>
              </Route>
              <Route path='/'>
                <chat/>
                <h1>Home Screen</h1>
              </Route>
            </Switch>
          </Router>
          
        </div>
       
    </div>
   }
    </>
  )
}

export default App
