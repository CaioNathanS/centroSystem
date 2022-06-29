import React, { useEffect, useState } from 'react';


import Axios from 'axios';
import Header from '../components/Header';
import Form from '../components/Form';





export default function Entrada(props) {

  const [agenda,setAgenda] = useState('');
 
  const [preferencial,setPreferencial] = useState('false');
  const [name,setName] = useState('');
  const [email,setEmail] = useState(''); 
  const [velho,setVelho] = useState('');
  const [diaData,setDiadata] = useState('')
  const [ordem,setOrdem] = useState([]);
  const [fila,setFila] = useState('');
  
  
    
  useEffect(()=>{
    let mounted=true;
    Axios.get('/api/agenda/listAgendamento')
    .then(response =>{
        if(mounted){
        setAgenda(response.data);

    }})
    return()=> mounted = false;

},[]);

async function getFila(fila) {
  
          await  Axios.get(`/api/agendamento/listvelho/${fila}`).then(response =>{
              setOrdem(response.data);
          })
  
}


async function handleSubmit(e) {
    e.preventDefault();

    try{
      const response = await Axios.post('/api/agendamento/novo',{name,email,velho,diaData,preferencial});
        alert(`Agendamento Realizado com Sucesso, 
                Número da fila :${response.data.numFila}!`)

        window.location.reload()
    
        
    } catch (err) { 
        alert(`Não foi possível realizar o Agendamento ${err.message}`);

    }

}


  return (
    <div>
 <Header/>

 <Form/>
           
      
    </div>
  );
}
