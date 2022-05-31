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

function App() {
  return (
  <BrowserRouter>
    <div> 
      

      <main>
          
       <Route path="/login"exact component={Login} ></Route>
       <Route path="/admin"exact component={Admin} ></Route>
       <Route path="/agenda"exact component={Agenda} ></Route>
       <Route path="/agendamento"exact component={Agendamento} ></Route>
       <Route path="/velhos" exact component={Velho} ></Route>
       <Route path="/newvelho" exact component={NovoVelho} ></Route>
       <Route path="/newagenda" exact component={NovaAgenda} ></Route>
       <Route path="/" exact component={Entrada} ></Route>
       
      

      </main>






      </div>
  </BrowserRouter>
  );
}

export default App;
