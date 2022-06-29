import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';


export default function Agendamento(props) {


const history=useHistory();
const token = localStorage.getItem('token');

if(!token){
    history.push('/')
    alert('Não possui autorização para acessar essa rota')
}

const [agendamento,setAgendamento] = useState('');

useEffect(()=>{
    let mounted=true;
    Axios.get(`/api/velho/list/${props.match.params.id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setAgendamento(response.data);

    }})
    return()=> mounted = false;
    

},[token]);


return (
    <div>

<div style={{"text-align":"center"}} > 
        {agendamento !== '' && 
        <>
         <div>
         
        {agendamento.map((agendamento) => (
            <>
           <h3>   {agendamento.nome}  </h3>


           <div class="br-table" title="Tabela Velhos">
        <div class="table-header">
          <div class="top-bar">
            <div class="table-title">Fila</div>
          </div>
        </div>
        <table>
        <thead>
            <tr>
              <th class="border-bottom" scope="col">Nome</th>
              <th class="border-bottom " scope="col">Email</th>
              <th class="border-bottom " colspan="1" scope="col">Ordem</th>
            </tr>
          </thead>
          <tbody>
             
          {agendamento.agendamentos.map((agendamentos) => (
            <>
            {agendamentos.preferencial !== true && 
                 <tr>
                 <td> {agendamentos.nome}</td>
                 <td> {agendamentos.email}</td>
                 <td> {agendamentos.numFila}</td>
                 </tr>
            }
                       
                        </>
                    ))}
           
          </tbody>
         
        </table>
      </div>

           <div class="br-table" title="Tabela Velhos">
        <div class="table-header">
          <div class="top-bar">
            <div class="table-title">Preferencial</div>
          </div>
        </div>
        <table>
        <thead>
            <tr>
              <th class="border-bottom" scope="col">Nome</th>
              <th class="border-bottom " scope="col">Email</th>
              <th class="border-bottom " colspan="1" scope="col">Ordem</th>
            </tr>
          </thead>
          <tbody>
               
          {agendamento.agendamentos.map((agendamentos) => (
            <>
            {agendamentos.preferencial === true && 
                 <tr>
                 <td> {agendamentos.nome}</td>
                 <td> {agendamentos.email}</td>
                 <td> </td>
                 </tr>
            }
                       
                        </>
                    ))}
           
          </tbody>
         
        </table>
      </div>
           
           
            </>
        ))} 
        
        </div>
        </>  
        
        }
        
    </div>
           
      
    </div>
  );
}
