import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';
import TabelaAgenda from '../components/TabelaAgenda';


export default function Agenda() {


const history=useHistory();
const token = localStorage.getItem('token');

if(!token){
    history.push('/')
    alert('Não possui autorização para acessar essa rota')
}

const [agenda,setAgenda] = useState('');

useEffect(()=>{
    let mounted=true;
    Axios.get('/api/agenda/list',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setAgenda(response.data);

    }})
    return()=> mounted = false;
    

},[token]);


return (
    <div>

<TabelaAgenda/>

<div style={{"text-align":"center"}} > 


        {agenda !== '' && 
        <>
         <h1> Agenda </h1> 
        {agenda.map((agenda) => (
            <ul> 
                <li> {agenda.diaData}  </li>
                <li> {agenda.aberto === true ? "Aberto" : "Fechado" }  </li>
                <p> Velhos </p>
                    {agenda.velhos.map((velhos) => (
                        <>
                        <li> {velhos.medium}</li>
                        </>
                    ))}
                <p> Agendamentos </p>
                    {agenda.agendamentos.map((agendamentos) => (
                        
                        <>
                        <li> {agendamentos.nome}</li>
                        </>
                    ))}
            </ul>
        ))} 
        </>  
        }
    </div>
           
      
    </div>
  );
}
