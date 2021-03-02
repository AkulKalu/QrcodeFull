import React  from 'react';
import './scss/AsideToggle.scss'

export default function AsideToggle(props) {
    const { toggle } = props; 

    return <div onClick={toggle} className="AsideToggle">
           M
         </div>
    

}