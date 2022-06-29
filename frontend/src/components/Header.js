import React from 'react';
import { Link } from 'react-router-dom';




export default function Header() {


  return( 
  <div>
    <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
   
      <span class="mdl-layout-title">Centro System </span>
    
      <div class="mdl-layout-spacer"></div>
   
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <Link class="mdl-navigation__link" to="/admin">Admin</Link>
       
      </nav>
    </div>
  </header>



</div>
    
  )
}