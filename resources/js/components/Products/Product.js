import React, {useContext} from 'react';
import './scss/Product.scss';
import Toggle from '../Shared/Toggle'
import QrCodeImg from '../../storage/SQCLogo.svg';
import {generateQrCode} from '../../Functions/server';
import {store} from '../HOC/StateProvider';

export default function Product({ data, columns, onClick, style }) {
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
 

    function downloadSVG(e,svgString, name) {
        e.stopPropagation();
        const url = window.URL.createObjectURL(new Blob([svgString]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}.svg`); 
        link.click();
    }
 
    
    let columnFields = Object.keys(columns).map((key, i) => {
        let col = columns[key];
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
                                src={data[col.dataKey]}> 
                            </img>
                        )  
            case 'Active':
                return  cell(
                    <Toggle
                    onToggle = {setActiveStatus}
                    on = {data.active}
                    />, {'data-escape':true, style: {cursor: 'unset'}}
                )
             case 'QrCode':
                
                return cell(
                    <div 
                        onClick={(e) => downloadSVG(e, data.qrcode, data.model)}  
                        className="QrImg" 
                        data-escape 
                        dangerouslySetInnerHTML={{__html : data.qrcode }}>
                    </div> , {'data-escape':true, style: {cursor: 'unset'}}
                )
            case 'Price':
                return cell(
                    <div className="Text">
                      {`${data[col.dataKey]}${data['currency']}`}
                    </div>
                )  
            default:
                return cell(
                    <div className="Text">
                      {data[col.dataKey]}
                    </div>
                ) 
        }
        
    })
    
    return  <div style={style} onClick={onClick}  className="Row">
                    {columnFields}
            </div>
}