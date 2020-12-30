import React from 'react';
import './scss/Product.scss';
import Toggle from '../Shared/Toggle'
import QrCodeImg from '../../storage/SQCLogo.svg';
import {toogleActive, generateQrCode} from '../../Functions/server';
import {downloadFile} from '../../Functions/actions';

export default function Product(props) {

    const setActiveStatus = () => {
        toogleActive(props.data.id, {
            store_id: props.data.store_id,
            active:  props.data.active ? 0 : 1
        }) 
        .then( res =>{
            props.updateProduct(res.data, props.data.index)
        })
      
    }
    const downloadQrCode = () => {
        // generateQrCode(props.data.store_id, props.data.id)
        // .then( res =>downloadFile(res.data, props.data.name, 'svg' ))
    }
 
    
    let columns = Object.keys(props.columns).map((key, i) => {
        let col = props.columns[key];
        const cell = (cont, props) => {
            return <div 
                    key={`row${i}`} 
                    className="Cell"
                    {...props}
                    >
                    {cont}
                    </div>
        }
        switch (key) {
            case 'Image':
                return cell( 
                            <img 
                                className="PDImg" 
                                alt="Product" 
                                src={props.data[col.dataKey]}> 
                            </img>
                        )  
            case 'Active':
                return  cell(
                    <Toggle
                    onToggle = {setActiveStatus}
                    on = {props.data.active}
                    />, {'data-escape':true}
                )
             case 'QrCode':
                return cell(
                    <img 
                        onClick={downloadQrCode}  
                        className="QrImg" 
                        data-escape 
                        alt="Generate QrCode" 
                        src={QrCodeImg}>
                    </img> , {'data-escape':true}
                )
            case 'Price':
                return cell(
                    <div className="Text">
                      {`${props.data[col.dataKey]}${props.data['currency']}`}
                    </div>
                )  
            default:
                return cell(
                    <div className="Text">
                      {props.data[col.dataKey]}
                    </div>
                ) 
        }
        
    })
    
    return  <div onClick={props.onClick}  className="Row">
                    {columns}
            </div>
}