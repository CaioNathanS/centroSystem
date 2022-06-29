import React, { useEffect, useState } from 'react';
import{ Link, useHistory} from 'react-router-dom';

import Axios from 'axios';
import Header from '../components/Header';


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

    async function abrirVelho(id) {
        if (window.confirm("Tem certeza que deseja editar?")) {
            try{
                await  Axios.put(`/api/velho/edit/${id}`,
                {status:true},   
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        
                    }
                }).then(response =>{
                    window.location.reload()
        
                })
            
    
            } catch(err) {
                alert(err);
            }
        }
     }


     async function fecharVelho(id) {
        if (window.confirm("Tem certeza que deseja editar?")) {
            try{
                await  Axios.put(`/api/velho/edit/${id}`,
                {status:false},   
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        
                    }
                }).then(response =>{
                    window.location.reload()
        
                })
            
    
            } catch(err) {
                alert(err);
            }
        }
     }

     async function fecharAgenda(id) {
        if (window.confirm("Tem certeza que encerrar essa agenda?")) {
            try{
                await  Axios.put(`/api/agenda/close/${id}`,   
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        
                    }
                }).then(response =>{
                    window.location.reload()
        
                })
            
    
            } catch(err) {
                alert(err);
            }
        }
     }

     async function deleteAgenda(id) {
        if (window.confirm("Tem certeza que deseja excluir essa agenda?")) {
            try{
                await  Axios.delete(`/api/agenda/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                }).then(response =>{
                    window.location.reload()
        
                })
            
    
            } catch(err) {
                alert(err);
            }
        }
     }

     async function deleteVelho(id) {
        if (window.confirm("Tem certeza que deseja excluir essa agenda?")) {
            try{
                await  Axios.delete(`/api/velho/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                }).then(response =>{
                    window.location.reload()
        
                })
            
    
            } catch(err) {
                alert(err);
            }
        }
     }


    
  return (
    <div>
        <Header/>


        <div class="p-3 row container-fluid" style={{"text-align":"center"}}>
                  <div class="col-sm ">
                    <div class="br-card">
                      <div class="card-header"><button class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">Agendamentos
        </button></div>
                      <div class="card-content">
                      {agendamentos !== '' && 
        <>
         <div> Total: {agendamentos} </div>
        </>
        } 
        {preferencial !== '' && 
        <>
         <div> Preferencial: {preferencial} </div>
        </>
        }
        <div>
        <button  onClick={handleZerar} class="br-button danger" type="button">Zerar 
      </button>
       
        </div>

      

                          </div>
                    </div>
                  </div>
                  <div class="col-sm ">
                    <div class="br-card">
                      <div class="card-header"><button class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">Agenda
        </button> </div>
                      <div class="card-content">
                     <Link to ='newagenda'> <button class="br-button  circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fas fa-plus" aria-hidden="true"></i>
        </button> </Link>
        <button class="br-button  circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fas fa-search" aria-hidden="true"></i>
        </button>

        {agenda !== '' && 
        <>
        {agenda.map((agenda) => (
           
            <div> {agenda.aberto === true ? 
             <div> 
                  <div class="p-3 br-switch medium">
                  
<input id="checkAgenda" name="checkAgenda" type="checkbox"  onChange={()=> fecharAgenda(agenda._id)}  defaultChecked />
<label for="checkAgenda" style={{"color":"green"}} >  {agenda.diaData} </label>
<button style={{"color":"red"}}
onClick={()=> deleteAgenda(agenda._id)}
class="br-button red circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fa fa-trash" aria-hidden="true"></i>
    </button>

</div> 
<div>
    
   
    </div>
             </div>
            :
            <div class="p-3 medium">
        
            <label style={{"color":"blue"}} >  {agenda.diaData} </label>
            <button class="br-button  circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fas fa-search" aria-hidden="true"></i>
        </button>
<button 
onClick={()=> deleteAgenda(agenda._id)}
style={{"color":"red"}}
class="br-button red circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fa fa-trash" aria-hidden="true"></i>
    </button>

</div> 
            
            }  
            
            
            
            </div>               
        
    ))} 
    </>
        
        }

        

                      </div>
                    </div>
                  </div>
                  <div class="col-sm ">
                    <div class="br-card">
                      <div class="card-header ">
  
            <button class="br-button primary mt-3 mt-sm-0 ml-sm-3" type="button">Velhos
        </button>
        <Link to='newvelho' style={{"text-decoration":"none"}}> <div> <button class="br-button  circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fas fa-plus" aria-hidden="true"></i>
        </button>  </div> </Link>
  
        </div>
                      <div class="card-content"> 
                      
                      <div style={{"text-align":"center"}} > 
   
        {velhos !== '' && 
        <>
         <table className="w3-table w3-striped w3-white">

<thead>
        <tr>
            <th>Nome</th>
            <th>Fila</th>
            <th></th>
            
            
            
            
        </tr>
        </thead>
       
        {velhos.map((velho) => (
           <tr> 
                <td>  <Link style={{"color":"blue"}} to={`/agendamento/${velho._id}`} > {velho.nome} </Link></td>
                <td> {10-velho.vagas} </td>
                

                <td>{velho.consulta === true ? 
                <>
                   <div class="p-3 br-switch medium">
                  
                  <input id="Close" name="Close" type="checkbox"  defaultChecked={true} onChange={()=> fecharVelho(velho._id)}  />
                  <label for="Close" style={{"color":"green"}} >  </label>
                  <button 
                  onClick={()=> deleteVelho(velho._id)}
                  style={{"color":"red"}}
                  class="br-button red circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                      </div>
                </> 
                :
                <>
                   <div class="p-3 br-switch medium">
                  
                  <input id="Open" name="Open" type="checkbox" defaultChecked={false} onChange={()=> abrirVelho(velho._id)}  />
                  <label for="Open" style={{"color":"green"}} >  </label>
                  <button 
                  onClick={()=> deleteVelho(velho._id)}
                  style={{"color":"red"}}
                  class="br-button red circle mt-3 mt-sm-0 ml-sm-3" type="button" aria-label="Ícone ilustrativo"><i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                      </div>
                </> 
                 
                 } </td> 
            </tr>
            
        ))} 
         </table>
        </>  
        }
    </div>

                      
                      </div>
                    </div>
                  </div>
                </div>



    </div>
  );
}
