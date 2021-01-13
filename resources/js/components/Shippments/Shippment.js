import React from 'react';
import Toggle from '../Shared/Toggle';
import './scss/Shippment.scss';




export default function Shippment({columns, data, onClick}) {
    
    let columnFields = Object.keys(columns).map((key, i) => {
        let col = columns[key];
        let cellContent = <div className="Text">{data[col.dataKey]}</div> ;
      
        if(col.dataKey === 'shipped') {
            if(data[col.dataKey]) {
                cellContent = <div className="Text">{data.updated_at}</div> ;
            }else {
                cellContent = <Toggle on={false} />
            }
        }
        return  <div key={`row${i}`} className="Cell">{cellContent}</div>

    })
    
    return   <div onClick={onClick}  className="Row">
                {columnFields}
            </div>
}
