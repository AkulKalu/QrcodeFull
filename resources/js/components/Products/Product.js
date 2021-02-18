import React, {useContext} from 'react';
import './scss/Product.scss';
import Toggle from '../InputElements/Toggle';
import Cell from '../Table/Cell';
import QrCode from './QrCode';

import {store} from '../HOC/StateProvider';

export default function Product(props) {
    let { data, columns, onClick, style } = props;
    const {state, dispatch} = useContext(store);

    const setActiveStatus = () => {
        let productData = {};
        Object.keys(state.products.new).forEach(
            key => {
                productData[key] = data[key]
            }
        );
       
        dispatch.products.edit(data.id, {
            ...productData,
            store_id: data.store_id,
            active:  data.active ? 0 : 1
        }, data.idx); 
    }
 
    
    let columnFields = Object.keys(columns).map((name, i) => {
        let col = columns[name];
        let lKey = name;
        switch (name) {
            case 'Image':
                return <Cell key = {lKey}>
                            <img 
                                className="PDImg" 
                                alt="Product" 
                                src={data[col.dataKey]}> 
                            </img>
                         </Cell>
                            
            case 'Active':
                return   <Cell key = {lKey} data-escape  style = {{cursor: 'unset'}}  >
                                <Toggle
                                onToggle = {setActiveStatus}
                                on = {data.active}
                                />
                         </Cell>
             case 'QrCode':
                return  <QrCode key = {lKey} data={data} />

            case 'Price':
                return <Cell key = {lKey} >
                    <div className="Text">{data[col.dataKey]}{data['currency']}</div>
                </Cell>
            default:
                return <Cell key = {lKey} text = {data[col.dataKey]} />
                      
        }
        
    })
    
    return  <div style={style} onClick={onClick}  className="Row">
                    {columnFields}
            </div>
}