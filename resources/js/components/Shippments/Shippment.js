import React from 'react';
import Cell from '../Table/Cell';
import Mail from './Mail';
import './scss/Shippment.scss';




export default function Shippment(props) {
    let {columns, data, onClick} = props;

    let columnFields = Object.keys(columns).map((name, i) => {
        let col = columns[name];
        let value = data[col.dataKey] ;
      
        if(col.dataKey === 'shipped') {
            if(data[col.dataKey]) {
                value = new Date(data.updated_at).toDateString();
            }else {
                return   <Cell 
                            data-escape 
                            style={{cursor: 'unset'}} 
                            key={name} > 
                                <Mail shippmentId = {data.id} /> 
                        </Cell>
            }
        }
        return  <Cell key={name} text = {value} />

    })
    
    return   <div onClick={onClick}  className="Row">
                {columnFields}
            </div>
}
