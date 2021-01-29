import React from 'react';
import './scss/Currency.scss';

export default function Currency(props) {
   
    let currency = ['$', '£', '€' ].map( curr => {
        let active = {
            opacity: 1
        }
        return <span style={props.current === curr ? active : null} className="Btn"
                key={curr} 
                onClick={()=>props.onChange(curr, 'currency')}>
                    {curr}
            </span>
    });
    return <div className="Currency">
                {currency}
            </div>
      
}