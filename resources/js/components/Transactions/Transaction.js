import React from 'react';
import './scss/Transaction.scss'


export default function Transaction({columns, data, onClick}) {
    let columnFields = Object.keys(columns).map((key, i) => {
        let col = columns[key];
        let value = data[col.dataKey];
        if(key === 'Date') value = new Date(value).toDateString();
        return  <div key={`row${i}`}  className="Cell"><div className="Text">{value}</div></div>
    })
    
    return   <div onClick={onClick}  className="Row">
                {columnFields}
            </div>
   
           
    
}