import React, { useEffect, useState } from 'react';


import Axios from 'axios';


export default function Form() {

  const [agenda,setAgenda] = useState('');
 
  const [preferencial,setPreferencial] = useState('false');
  const [name,setName] = useState('');
  const [email,setEmail] = useState(''); 
  const [velho,setVelho] = useState('');
  const [diaData,setDiadata] = useState('')
  const [ordem,setOrdem] = useState('');
  const [numFila,setNumFila] = useState('');

  const [hidden,setHidden] = useState('false');
 
  function showOrdem(){
    const hidden = document.getElementById("ordem").hidden;
    if(hidden){
        setHidden(false);
        setPreferencial('true')
        setNumFila(0)
    }else{
        setNumFila(0)
        setHidden(true)
        setPreferencial('false')
    }  
}

  
    
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
  setHidden(false)
          await  Axios.get(`/api/agendamento/listvelho/${fila}`).then(response =>{
              setOrdem(response.data);
          })

  
}


async function handleSubmit(e) {
    e.preventDefault();
    if(hidden!==true & numFila !== null){
      try{
        const response = await Axios.post('/api/agendamento/novo',{name,email,velho,diaData,preferencial,numFila});
          alert(`Agendamento Realizado com Sucesso, 
                  Número da fila :${response.data.numFila}!`)
  
          window.location.reload()
      
          
      } catch (err) { 
          alert(`Não foi possível realizar o Agendamento, verifique se todos os campos foram preenchidos corretamente`);
  
      }
    }else{
      try{
        const response = await Axios.post('/api/agendamento/novopref',{name,email,velho,diaData,preferencial,numFila});
          alert(`Agendamento Preferencial Realizado com Sucesso`)
  
          window.location.reload()
      
          
      } catch (err) { 
          alert(`Não foi possível realizar o Agendamento`);
  
      }
    }
    

}


  return( 
  <div>   
      

<form onSubmit={handleSubmit}
     style={{"marginTop":"10px"}}
          class="container-fluid br-modal" id='cadastro'>
    <div class="container-fluid p-1 p-sm-4">
      <div class="br-modal-header">
        <div class="br-modal-title" title="Título">Agendamento</div>
        
      </div>
        <div class="br-modal-body" >
        </div>
        <div class="row">
          <div class="col-sm-12 my-2">
            <div class="br-input">
            <label>Nome</label>
              <input type='text'
              placeholder='Nome'
              required
              onChange={(e)=>setName(e.target.value)}
              ></input>
            </div>

            <div class="br-input">
            <label>Email</label>
              <input type='text'
              placeholder='Email'
              required
              onChange={(e)=>setEmail(e.target.value)}
              ></input>
            </div>                           
          </div>
        </div>

        <label>Dia</label>

        <ul class="demo-list-control mdl-list">
        {agenda !== '' && 
                                 <>
								{agenda.map((agenda) => (
                  <li class="mdl-list__item">
                                        <span class="mdl-list__item-primary-content">
                  
                                        {agenda.diaData}
                                        </span>
                                        <span class="mdl-list__item-secondary-action">
                                          <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-3">
                                            <input 
                                            required
                                            type="radio" value={agenda.diaData}
                                        onChange={(e) => setDiadata(e.target.value)}
 
                                            id="list-option-3" class="mdl-radio__button" name="options2"
                                           />
                                          </label>
                                        </span>
                                        </li>
                                  ))} 
                                  </>
                                }
          </ul>

        <label>Velho</label>

        <ul class="demo-list-control mdl-list">
								
                                {agenda !== '' && 
                                 <>
							                	{agenda.map((agenda) => (
                                    <>
                                    {agenda.velhos.map((velhos) =>(
                                        
                 <li class="mdl-list__item">
                  <span class="mdl-list__item-primary-content">
                  
                  {velhos.nome}
                  </span>
                  <span class="mdl-list__item-secondary-action">
                    <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-1">
                      <input 
                      required
                      type="radio" id="list-option-2" class="mdl-radio__button" name="options"
                      defaultValue={velhos.nome}
                      onClick={(e) => setVelho(e.target.value) & getFila(e.target.value) & showOrdem}/>
                    </label>
                  </span>
                </li>
                ) )}
                </>
                                       
                 ))} 
              </>
              }
                                
							</ul>


              <div  class="br-switch medium">
  <input id="check-all" name="check-all" type="checkbox" onChange={showOrdem} />
  <label for="check-all">Preferencial</label>
</div>  
      
       <div hidden={hidden} id='ordem'>
                        <label> Ordem Fila </label>
                       
                        <ul class="demo-list-control mdl-list">
								
                                 {ordem !== '' && 
                                 <>
							                	{ordem.map((ordem) => (
                                    <>
                                    <li class="mdl-list__item">
                                      {ordem.status === 'disponivel' ? 
                  <>                    
                  <span class="mdl-list__item-primary-content">
                  
                  {ordem.numero}
                  </span>
                  <span class="mdl-list__item-secondary-action">
                    <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-3">
                      <input
                      type="radio" value={ordem.numero} onChange={(e) => setNumFila(ordem.numero)}
                      id="list-option-3" class="mdl-radio__button" name="options2"
                     />
                    </label>
                  </span>
                  </> :

<>                    
<span class="mdl-list__item-primary-content">

    {ordem.numero}
    </span>
    <span class="mdl-list__item-secondary-action">
      <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-3">
        <input type="radio" 
        value={ordem.numero}
        id="list-option-3" class="mdl-radio__button" name="options2" disabled
      />
      </label>
    </span>
    </>
                  
                  }
                  
                </li>
                                    
                                                  </>     
                                  ))} 
                                  </>
                                }
							
                                
					
							</ul>
					
        
              </div>

</div>




<button class="br-sign-in block" type="submit"><i  aria-hidden="true"></i>Agendar
</button>

    </form>


</div>
    
  )
}