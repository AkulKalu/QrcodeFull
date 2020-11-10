import React from 'react';
import '../css/Product.css';
import QrCodeImg from '../storage/SQCLogo.svg';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';

export default function Product(props) {

    let productActive = {
        transform: ' translateX(100%)',
        backgroundColor: 'rgb(4, 161, 4)'
    }
    const toogleActive = () => {
        const url = window.location.origin + '/products' + `/${props.product.id}`;
        const data = {
            _method: 'PATCH',
            store_id: props.product.store_id,
            active:  props.product.active ? 0 : 1
        };

        window.axios.post(url, data)
        .then( res =>{
            props.editProduct(res.data, props.product.index)
        })
        .catch( err=> console.log(err));
    }
    const downloadQrCode = () => {
        const url = window.location.origin +'/qrcodes' + `/${props.product.store_id}` + `/${props.product.id}`;
    
        window.axios.get(url)
        .then( res =>{
            const url = window.URL.createObjectURL(new Blob([res.data.qrCode]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${props.product.name}.svg`); //or any other extension
            link.click();
        })
        .catch( err=> console.log(err));
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
                            <div data-escape onClick={toogleActive} className="PDToggle">
                                <div data-escape style={ props.product.active ? productActive : null} className="PDToggleSW"></div>
                            </div>
                        </div>
                        <div onClick={downloadQrCode} data-escape style={{width: '10%'}} className="PDCell PDQrCode">
                            <img data-escape alt="Generate QrCode" src={QrCodeImg}></img>
                        </div>
                </div>
            </PanelSwitch>
           
    
}