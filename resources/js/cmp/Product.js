import React from 'react';
import '../css/Product.css';
import QrCodeImg from '../storage/SQCLogo.svg';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';
import {toogleActive, generateQrCode} from '../Functions/server';
import {downloadFile} from '../Functions/actions';

export default function Product(props) {

    const setActiveStatus = () => {
        toogleActive(props.product.id, {
            store_id: props.product.store_id,
            active:  props.product.active ? 0 : 1
        }) 
        .then( res =>{
            props.updateProduct(res.data, props.product.index)
        })
      
    }
    const downloadQrCode = () => {
        generateQrCode(props.product.store_id, props.product.id)
        .then( res =>downloadFile(res.data, props.product.name, 'svg' ))
    }

    let productActive = {
        transform: ' translateX(100%)',
        backgroundColor: 'rgb(4, 161, 4)'
    }
    
    return <PanelSwitch panel={ProductPanel} panelProps={{...props}}>
                <div  className="PDCont">
                        <div style={{width: '10%'}} className="PDCell PDId">{props.product.id}</div>
                        <div style={{width: '20%'}} className="PDCell PDImg">
                            <img alt="Product" src={props.product.image_url}></img>
                        </div>
                        <div style={{width: '20%'}} className="PDCell PDName">{props.product.name}</div>
                        <div style={{width: '20%'}} className="PDCell PDManu">{props.product.manufacturer}</div>
                        <div style={{width: '10%'}} className="PDCell PDPrice">{props.product.price}</div>
                        <div data-escape style={{width: '10%'}} className="PDCell PDActive">
                            <div data-escape onClick={setActiveStatus} className="PDToggle">
                                <div data-escape style={ props.product.active ? productActive : null} className="PDToggleSW"></div>
                            </div>
                        </div>
                        <div onClick={downloadQrCode} data-escape style={{width: '10%'}} className="PDCell PDQrCode">
                            <img data-escape alt="Generate QrCode" src={QrCodeImg}></img>
                        </div>
                </div>
            </PanelSwitch>
           
    
}