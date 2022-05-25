import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Login from './screens/Login'

function App() {
  return (
  <BrowserRouter>
    <div> 
      

      <main>
          
       <Route path="/login"exact component={Login} ></Route>

      

      </main>






      </div>
  </BrowserRouter>
  );
}

export default App;
