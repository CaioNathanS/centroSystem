import React, { useState } from 'react';


import Axios from 'axios';
import { useHistory } from 'react-router-dom';




export default function NovaAgenda(props) {
 
   
  const [diaData,setDiaData] = useState('');
  const history=useHistory();
    
  const token = localStorage.getItem('token');

  if(!token){
      history.push('/')
      alert('Não possui autorização para acessar essa rota')
  }
  async function handleCreate(e) {
    e.preventDefault();

    try{
      await Axios.post('/api/agenda/novo',{diaData},{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
        alert(`Criado Com Sucesso`)
                
        history.push('/admin')
        
    } catch (err) { 
        alert(`Não foi possível Cadastrar`);

    }

}


  return (
    <div>

      <div>
        <form onSubmit={handleCreate}>
          <div>
            <label>Data</label>
              <input type='date'
              required
              onChange={(e)=>setDiaData(e.target.value)}
              ></input>
          </div>


            <button type='submit'> Ok</button>

        </form>
      </div>

           
      
    </div>
  );
}
