import React, { useState } from 'react';


import Axios from 'axios';
import { useHistory } from 'react-router-dom';




export default function NovoVelho(props) {
 
   
  const [nome,setNome] = useState('');
  const [medium,setMedium] = useState('') ;
  const history=useHistory();
    
  const token = localStorage.getItem('token');

  if(!token){
      history.push('/')
      alert('Não possui autorização para acessar essa rota')
  }
  async function handleCreate(e) {
    e.preventDefault();

    try{
      await Axios.post('/api/velho/novo',{nome,medium},{
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
            <label>Nome</label>
              <input type='text'
              required
              onChange={(e)=>setNome(e.target.value)}
              ></input>
          </div>

          <div>
            <label>Medium</label>
                <input type='text'
                required
                onChange={(e)=>setMedium(e.target.value)}
                ></input>
          </div>

            <button type='submit'> Ok</button>

        </form>
      </div>

           
      
    </div>
  );
}
