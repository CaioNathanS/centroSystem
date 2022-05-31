import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';


export default function Agendamento() {


const history=useHistory();
const token = localStorage.getItem('token');

if(!token){
    history.push('/')
    alert('Não possui autorização para acessar essa rota')
}

const [agendamento,setAgendamento] = useState('');

useEffect(()=>{
    let mounted=true;
    Axios.get('/api/velho/list',{
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
         <h1> Agendamentos </h1> 
         <div>
         
        {agendamento.map((agendamento) => (
            <>
           <h3>   <button>{agendamento.nome} </button> </h3>
            <table className="w3-table w3-striped w3-white">
            <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Fila</th>  
                        <th>Preferencial</th>
                        <th>Data</th>                       
                    </tr>
                    </thead>
            
                
                {agendamento.agendamentos.map((agendamentos) => (
                        <tr>
                        <td> {agendamentos.nome}</td>
                        <td> {agendamentos.email}</td>
                        <td> {agendamentos.numFila}</td>
                        <td> {agendamentos.preferencial=== true ? "Sim" : "Não" }</td>
                        <td> {agendamentos.diaData}</td>
                        
                        </tr>
                    ))}
           
            </table>
            </>
        ))} 
        
        </div>
        </>  
        
        }
        
    </div>
           
      
    </div>
  );
}
