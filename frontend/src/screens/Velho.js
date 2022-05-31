import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';


export default function Velho() {


const history=useHistory();
const token = localStorage.getItem('token');

if(!token){
    history.push('/')
    alert('Não possui autorização para acessar essa rota')
}

const [velhos,setVelhos] = useState('');

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
    return()=> mounted = false;
    

},[token]);


return (
    <div>

<div style={{"text-align":"center"}} > 
        {velhos !== '' && 
        <>
         <h1> Velhos </h1> 
         <div style={{"display":"flex"}}>
        {velhos.map((velhos) => (
            
            <ul className='velho'> 
                <li> {velhos.nome}  </li>
                <li> {velhos.medium}</li>
                <li> {velhos.consulta === true ? "Aberto" : "Fechado" }</li>
                
            </ul>
        ))} 
        </div>
        </>  
        
        }
        
    </div>
           
      
    </div>
  );
}
