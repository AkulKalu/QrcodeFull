import React from 'react';
import './scss/Currency.scss';

export default function Currency(props) {
   let { current, onChange } = props;
    let currency = ['$', '£', '€' ].map( curr => {
        let active = {
            opacity: 1
        }
        return <span style={current === curr ? active : null} className="Btn"
                key={curr} 
                onClick={()=> onChange(curr, 'currency')}>
                    {curr}
            </span>
    });
    return <div className="Currency">
                {currency}
            </div>
      
}