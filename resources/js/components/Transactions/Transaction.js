import React from 'react';
import './scss/Transaction.scss'


export default function Transaction(props) {
    let columns = Object.keys(props.columns).map((key, i) => {
        let col = props.columns[key];
        return  <div key={`row${i}`}  className="Cell"><div className="Text">{props.data[col.dataKey]}</div></div>
    })
    
    return   <div onClick={props.onClick}  className="Row">
                {columns}
            </div>
   
           
    
}