import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'


import Login from './Login'
import App from './App'

function routes(){
    return(
        <>
      <Switch>
        <Route path="/login/:id">
            <Login />
        </Route>
        <Route path="/">
            <App />
        </Route>
      </Switch>
      
      </>
    )
}

export default routes