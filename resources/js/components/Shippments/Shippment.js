import React from 'react';
import Toggle from '../Shared/Toggle';
import './scss/Shippment.scss';




export default function Shippment(props) {
    
    let columns = Object.keys(props.columns).map((key, i) => {
        let col = props.columns[key];
        let cellContent = <div className="Text">{props.data[col.dataKey]}</div> ;
      
        if(col.dataKey === 'shipped') {
            if(props.data[col.dataKey]) {
                cellContent = <div className="Text">{props.data.updated_at}</div> ;
            }else {
                cellContent = <Toggle on={false} />
            }
        }
        return  <div key={`row${i}`} className="Cell">{cellContent}</div>

    })
    
    return   <div  className="Row">
                {columns}
            </div>
}
