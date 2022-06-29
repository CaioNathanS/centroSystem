import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Admin from './screens/Admin';
import Agenda from './screens/Agenda';
import Agendamento from './screens/Agendamento';
import Entrada from './screens/Entrada';
import Login from './screens/Login'
import NovaAgenda from './screens/NovaAgenda';
import NovoVelho from './screens/NovoVelho';
import Velho from './screens/Velho';

import '../node_modules/@govbr-ds/core/dist/core.css';

function App() {
  return (
  <BrowserRouter>
    <div> 

   
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
   <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"/>
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>

      <main>
          
       <Route path="/login"exact component={Login} ></Route>
       <Route path="/admin"exact component={Admin} ></Route>
       <Route path="/agenda"exact component={Agenda} ></Route>
       <Route path="/agendamento/:id"exact component={Agendamento} ></Route>
       <Route path="/velhos/:id" exact component={Velho} ></Route>
       <Route path="/newvelho" exact component={NovoVelho} ></Route>
       <Route path="/newagenda" exact component={NovaAgenda} ></Route>
       <Route path="/" exact component={Entrada} ></Route>
       
      

      </main>






      </div>
      <script src='../node_modules\@govbr-ds\core\dist\core.min.js'></script>
  
  </BrowserRouter>
  );
}

export default App;
