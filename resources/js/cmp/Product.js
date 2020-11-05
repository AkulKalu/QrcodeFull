import React, {useState, Fragment} from 'react';
import '../css/Product.css';
import QrCodeImg from '../storage/SQCLogo.svg';
import Backdrop from './Backdrop';
import ProductPanel from './ProductPanel';

export default function Product(props) {

    const [editProductPanel, openEditProductPanel] = useState(false);
    console.log(editProductPanel);
    return <Fragment>
        <div onClick={()=>openEditProductPanel(true)} data-id="1" className="PDCont">
                    <div style={{width: '10%'}} className="PDCell PDId">{props.product.id}</div>
                    <div style={{width: '20%'}} className="PDCell PDImg">
                        <img alt="Product" src={props.product.image_url}></img>
                    </div>
                    <div style={{width: '20%'}} className="PDCell PDName">{props.product.name}</div>
                    <div style={{width: '20%'}} className="PDCell PDManu">{props.product.manufacturer}</div>
                    <div style={{width: '10%'}} className="PDCell PDPrice">{props.product.price}</div>
                    <div style={{width: '10%'}} className="PDCell PDActive">
                        <div className="PDToggle">
                            <div className="PDToggleSW"></div>
                        </div>
                    </div>
                    <div style={{width: '10%'}} className="PDCell PDQrCode">
                        <img alt="Generate QrCode" src={QrCodeImg}></img>
                    </div>
                   
            </div>
            {editProductPanel ? 
                         <Backdrop>
                         <ProductPanel
                             product={props.product}
                             closePanel={()=> openEditProductPanel(false)}
                          />
                     </Backdrop> : null
                }
           
    </Fragment> 
}