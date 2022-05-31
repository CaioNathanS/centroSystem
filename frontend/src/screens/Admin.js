import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';


export default function Admin(props) {

    const [velhos,setVelhos] = useState('');
    const [agenda,setAgenda] = useState('');
    const [agendamentos,setAgendamentos]=useState('');
    const [preferencial,setPreferencial] =useState('');
    
    const history=useHistory();
        const token = localStorage.getItem('token');
    
        if(!token){
            history.push('/')
            alert('Não possui autorização para acessar essa rota')
        }
    
    
useEffect(()=>{
            
        let mounted=true;
         Axios.get('/api/velho/list',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then(response =>{
            if(mounted){
            setVelhos(response.data);
    
        }})
    
        Axios.get('/api/agenda/list',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then(response =>{
            if(mounted){
            setAgenda(response.data);
    
        }})
    
        Axios.get('/api/agendamento/total',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then(response =>{
            if(mounted){
            setAgendamentos(response.data);
    
        }})

        Axios.get('/api/agendamento/preferencial',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then(response =>{
            if(mounted){
            setPreferencial(response.data);
    
        }})
        return()=> mounted = false;
        
    
    },[token]);
    
    async function handleZerar(e) {
        e.preventDefault();
    
        try{
            await Axios.delete('/api/agendamento/zerar');
            alert(`Agendamentos zerados`)
    
            window.location.reload()
        
            
        } catch (err) { 
            alert(`Não foi possível zerar os agendamentos ${err.message}`);
    
        }
    
    }
    
  return (
    <div>
     <div style={{"text-align":"center"}}>Menu Inicial</div>

     <div style={{"text-align":"center","padding":"10px"}}  >   
            <button> Agenda </button>
            <button > Agendamentos </button>
            <button> Velhos </button>
     </div>

     <div style={{"text-align":"center"}} > 

        <h1> Agendamentos  </h1>
        
        <button onClick={handleZerar}> Zerar </button>

        {agendamentos !== '' && 
        <>
         <p> Total: {agendamentos} </p>
        </>
        } 
        {preferencial !== '' && 
        <>
         <p> Preferencial: {preferencial} </p>
        </>
        }

        <Link to='agendamento'> <button> Detalhes </button> </Link>
        
    </div>


    <div style={{"text-align":"center"}} > 
    <h1> Velhos </h1>
   <Link to='newvelho'> <button> Novo </button> </Link>
        {velhos !== '' && 
        <>
         <table className="w3-table w3-striped w3-white">

<thead>
        <tr>
            <th>Nome</th>
            <th>Medium</th>
            <th>Fila</th>
            <th>Status</th>
            <th></th>
            <th></th>
            
            
            
        </tr>
        </thead>
       
        {velhos.map((velho) => (
            <tr> 
                <td> {velho.nome}</td>
                <td> {velho.medium}</td>
                <td> {velho.numFila} </td>
                <td> {velho.consulta === true ? "Aberto" : "Fechado" }  </td>
                <td> <button> Editar </button> </td> 
            </tr>
        ))} 
         </table>
        </>  
        }
    </div>

    <div style={{"text-align":"center"}} > 
        {agenda !== '' && 
        <>
         <h1> Agenda </h1> 
        <Link to='newagenda'> <button> Abrir </button> </Link>
        <button> Consultar </button>
        {agenda.map((agenda) => (
            <ul> 
                <li> {agenda.diaData}  </li>
                <li> {agenda.aberto === true ? "Aberto" : "Fechado" }  </li>
                <li>  <button> Fechar </button></li>
               
            </ul>
        ))} 
        </>  
        }
    </div>



    </div>
  );
}
