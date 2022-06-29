import React from 'react';
import { Link } from 'react-router-dom';




export default function TabelaVelhos({velho}) {


  return( 
  <div>
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
    
  )
}