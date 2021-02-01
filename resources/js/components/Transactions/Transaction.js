import React from 'react';
import Cell from '../Table/Cell';
import './scss/Transaction.scss';


export default function Transaction(props) {
    
    let {columns, data, onClick} = props;

    let columnFields = Object.keys(columns).map((name, i) => {
        let col = columns[name];
        let value = data[col.dataKey];
        if(name === 'Date') value = new Date(value).toDateString();
       
        return  <Cell key={name} text = {value} />
    })
    
    return   <div onClick={onClick}  className="Row">
                {columnFields}
            </div>
   
           
    
}