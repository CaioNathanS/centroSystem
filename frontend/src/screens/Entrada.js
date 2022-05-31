import React, { useEffect, useState } from 'react';


import Axios from 'axios';





export default function Entrada(props) {

  const [agenda,setAgenda] = useState('');
 
  const [preferencial,setPreferencial] = useState('false');
  const [name,setName] = useState('');
  const [email,setEmail] = useState(''); 
  const [velho,setVelho] = useState('');
  const [diaData,setDiadata] = useState('')
  
    
  useEffect(()=>{
    let mounted=true;
    Axios.get('/api/agenda/listAgendamento')
    .then(response =>{
        if(mounted){
        setAgenda(response.data);

    }})
    return()=> mounted = false;
    

},[]);
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

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
              <input type='text'
              required
              onChange={(e)=>setName(e.target.value)}
              ></input>
          </div>

          <div>
            <label>Email</label>
                <input type='email'
                required
                onChange={(e)=>setEmail(e.target.value)}
                ></input>
          </div>

                     <section> 
                        <label> Dia </label>
						<label>
							<select 
                            value={diaData}
                            onChange={(e) => setDiadata(e.target.value)}>
                                 <option value='' selected> </option>
								
                                {agenda !== '' && 
                                 <>
								{agenda.map((agenda) => (
                                       <option> {agenda.diaData}</option> 
                                  ))} 
                                  </>
                                }
                                
							</select>
							<i></i>
						</label>
					</section>
            
                    <section> 
                        <label> Velho </label>
						<label>
							<select 
                            value={velho}
                            onChange={(e) => setVelho(e.target.value)}>
                                 <option value='' selected> </option>
								
                                {agenda !== '' && 
                                 <>
								{agenda.map((agenda) => (
                                    <>
                                    {agenda.velhos.map((velhos) =>(
                                        <>
                                        <option> {velhos.nome}</option>

                                        </>

                                    ) )}
                                    </>
                                       
                                  ))} 
                                  </>
                                }
                                
							</select>
							<i></i>
						</label>
					</section>

                    <section> 
                        <label>Preferencial </label>
						<label>
							<select 
                            value={preferencial}
                            onChange={(e) => setPreferencial(e.target.value)}>
                                 <option value='false' selected> Não </option>
                                 <option value='true' selected> Sim </option>
							
                                
							</select>
							<i></i>
						</label>
					</section>


            <button type='submit'> Ok</button>

        </form>
      </div>

           
      
    </div>
  );
}
