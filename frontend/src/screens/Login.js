import React, { useState } from 'react';


import Axios from 'axios';
import { useHistory } from 'react-router-dom';




export default function Login(props) {
 
   
  const [name,setName] = useState('');
  const [password,setPassword] = useState('') ;
  const history=useHistory();
    

  async function handleLogin(e) {
    e.preventDefault();

    try{
      const response = await Axios.post('/api/users/signin',{name,password});
        alert(`Seja vem Vindo, ${response.data.name}!`)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('nome',response.data.name);
                   
        history.push('/admin')
        
    } catch (err) { 
        alert(`Não foi possível realizar o Login ${err.message}`);

    }

}


  return (
    <div>

      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nome</label>
              <input type='text'
              required
              onChange={(e)=>setName(e.target.value)}
              ></input>
          </div>

          <div>
            <label>Senha</label>
                <input type='password'
                required
                onChange={(e)=>setPassword(e.target.value)}
                ></input>
          </div>

            <button type='submit'> Ok</button>

        </form>
      </div>

           
      
    </div>
  );
}
