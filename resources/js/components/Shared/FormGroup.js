import React  from 'react';
import './scss/FormGroup.scss';

export default function FormGroup(props) {
    let {name, children} = props;
   
        
    return <div className="GroupWrap" >
                <h3>{name}</h3>
                <div className="GroupContent">
                {children}
                </div>
               
            </div>
      
}