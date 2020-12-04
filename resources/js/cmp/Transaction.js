import React from 'react';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';
import '../css/Product.css';


export default function Transaction(props) {
    
    return  <div  className="PDCont">
                <div style={{width: '20%'}} className="PDCell">
                    {props.data.service}
                </div>
                <div style={{width: '10%'}} className="PDCell">
                    {props.data.transaction_id}
                </div>
                <div style={{width: '20%'}} className="PDCell">
                    {props.data.amount}
                </div>
                <div style={{width: '20%'}} className="PDCell">
                    {props.data.currency}
                </div>
                <div style={{width: '10%'}} className="PDCell">
                    {props.data.status}
                </div>
            </div>
            
           
    
}