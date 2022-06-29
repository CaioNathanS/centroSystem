import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';
import TabelaVelhos from '../components/TabelaVelhos';


export default function Velho(props) {


const history=useHistory();
const token = localStorage.getItem('token');

if(!token){
    history.push('/')
    alert('Não possui autorização para acessar essa rota')
}

const [velhos,setVelhos] = useState('');

useEffect(()=>{
    let mounted=true;
    Axios.get(`/api/velho/list/${props.match.params.id}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setVelhos(response.data);

    }})
    return()=> mounted = false;
    

},[token,props.match.params.id]);


return (
    <div>

<h2 className='p-3'> Velho </h2>

   

<div style={{"text-align":"center"}} > 
        {velhos !== '' && 
        <>
         <h1> Velhos </h1> 
         <div style={{"display":"flex"}}>
        {velhos.map((velhos) => (
            
            <ul className='velho'> 
                <li> {velhos.nome}  </li>
                <li> {velhos.vagas}</li>
                <li> {velhos.consulta === true ? "Aberto" : "Fechado" }</li>
                
            </ul>
        ))} 
        </div>
        </>  
        
        }

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

          {velhos !== '' && 
        <>
        
        {velhos.map((velhos) => (
            
             


            <tr> 
                <td> {velhos.nome}  </td>
                <td> {velhos.email}</td>
                <td> {velhos.numFila }</td>
                
            </tr>
        ))} 
        
        </>  
        
        }
            <tr>


              <td>Full color</td>
              <td>A2</td>
              <td>A3</td>
              
            </tr>
           
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
            <tr>

              <td>Full color</td>
              <td>A2</td>
              <td>A3</td>
              
            </tr>
           
          </tbody>
         
        </table>
      </div>
        
    </div>
           
      
    </div>
  );
}
