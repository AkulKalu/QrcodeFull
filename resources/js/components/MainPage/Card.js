import React from 'react';
import './scss/card.scss';




export default function SideMenu(props) {
  
   
    return <div className= "Card">
                <p>{props.content.text}</p>
            </div>
}

