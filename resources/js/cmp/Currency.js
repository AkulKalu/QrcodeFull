import React from 'react';
import '../css/Currency.css';

export default function Currency(props) {
    
    let currency = ['$', '£', '€' ].map( curr => {
        
        return <span className={props.current === curr ? "CurrencyBtn CurrencyActive" : "CurrencyBtn" } 
                key={curr} 
                onClick={()=>props.onChange(curr, 'currency')}>
                    {curr}
            </span>
    });
    return <div className="Currency">
                {currency}
            </div>
      
}