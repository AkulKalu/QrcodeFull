import React from 'react';
import '../css/Product.css';
import QrCodeImg from '../storage/SQCLogo.svg';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';
import {toogleActive, generateQrCode} from '../Functions/server';
import {downloadFile} from '../Functions/actions';

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
        generateQrCode(props.data.store_id, props.data.id)
        .then( res =>downloadFile(res.data, props.data.name, 'svg' ))
    }
 
    let productActive = {
        transform: ' translateX(100%)',
        backgroundColor: 'rgb(4, 161, 4)'
    }
    
    return <PanelSwitch panel={ProductPanel} panelProps={{...props}}>
                <div  className="PDCont">
                        <div style={{width: '20%'}} className="PDCell">
                            <img className="PDImg" alt="Product" src={props.data.image_url}></img>
                        </div>
                        <div style={{width: '10%'}} className="PDCell">{props.data.category}</div>
                        <div style={{width: '20%'}} className="PDCell">{props.data.model}</div>
                        <div style={{width: '20%'}} className="PDCell">{props.data.manufacturer}</div>
                        <div style={{width: '10%'}} className="PDCell">{props.data.price}</div>
                        <div data-escape style={{width: '10%'}} className="PDCell">
                            <div data-escape onClick={setActiveStatus} className="PDToggle">
                                <div data-escape style={ props.data.active ? productActive : null} className="PDToggleSW"></div>
                            </div>
                        </div>
                        <div data-escape style={{width: '10%'}} className="PDCell">
                            <img onClick={downloadQrCode}  className="PDQrImg" data-escape alt="Generate QrCode" src={QrCodeImg}></img>
                        </div>
                </div>
            </PanelSwitch>
           
    
}