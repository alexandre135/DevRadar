import React, {useEffect, useState} from 'react'
import api from './services/api'

//View modules
import Users from './modules/users/Users'
import Form from './modules/form/Form'


//CSS
import './Global.css'
import './Aside.css'
import './Users.css'
import './App.css'


function App() {

  const [users, setUsers] = useState([])
  

  
  
  useEffect(()=>{
    async function loadUsers(){
      const response = await api.get('/users')
      setUsers(response.data)
    }
    loadUsers()
  }, [])

  async function handleAddUser(data){
    const response = await api.post('/users', data)

    
    setUsers([response.data, ...users])
  }
  return (
    <div className="Container">
      <aside>
        <h5>Cadastrar</h5>
        <Form onSubmit={handleAddUser}/>
      </aside>
      <main>
        <ul>
          {users.map(user => (
              <Users key={user._id} user={user}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
