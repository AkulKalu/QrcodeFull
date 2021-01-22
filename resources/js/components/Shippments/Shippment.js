import React from 'react';

import Mail from './Mail';
import './scss/Shippment.scss';




export default function Shippment({columns, data, onClick}) {
  

    let columnFields = Object.keys(columns).map((key, i) => {
        let col = columns[key];
        let cellContent = <div className="Text">{data[col.dataKey]}</div> ;
      
        if(col.dataKey === 'shipped') {
            if(data[col.dataKey]) {
                cellContent = <div className="Text">{data.updated_at}</div> ;
            }else {
                return  <div  data-escape style={{cursor: 'unset'}} key={`row${i}`} className="Cell"><Mail shippmentId = {data.id} /></div>
            }
        }
        return  <div key={`row${i}`} className="Cell">{cellContent}</div>

    })
    
    return   <div onClick={onClick}  className="Row">
                {columnFields}
            </div>
}
