
import React from 'react';
import ReactDOM from 'react-dom';
import Appfile from './components/App'
import './index.css';
import reducer,{initialState} from './components/reducer'
import {StateProvider} from './components/StateProvider'

const App = ()=> {
 
  return ( 
    // stateprovider is data layer
    <StateProvider initialState={initialState} reducer={reducer}> 
       
        <Appfile/>
    </StateProvider>
    

  )
}
  
ReactDOM.render(<App/>,document.getElementById("root"))


// in js file only render method called

