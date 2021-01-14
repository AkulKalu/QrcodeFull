import React, {useState, useEffect} from 'react';
import './scss/ProductView.scss';
import Backdrop from '../Shared/Backdrop';
import Loader from '../Visual/Loader';
import {showProduct} from '../../Functions/server';


export default function ProductView({data, close, switchAction}) {
    const [product , setProduct] = useState(null)
    useEffect(() => {
       
        showProduct(data.product_id)
        .then( ({data : {product , store}}) => {
           setProduct({
               ...product[0],
               store : store[0]
           })
        })
    }, []);

    return   <Backdrop close={close}>
                <div {...switchAction} className="ProductView">
                    {!product ?  <Loader /> :
                        <div className="Content">
                            <div className="Left">
                                <img alt="img" src={product.image_url}></img>
                            </div>
                            <div className="Right">
                                <div className="StoreName"> 
                                    <h1>{product.store.name}</h1> 
                                </div>
                                <div className="Product">
                                    <h2>{product.category}</h2>
                                    <h1>{product.manufacturer}</h1>
                                    <h2>{product.model}</h2>
                                </div>
                                <div className="Info"> 
                                    <h1>{product.price + product.currency}</h1>
                                    <h2>In stock  -  {product.stock}</h2>
                                </div>
                            </div>
                        
                        </div>
                    }
                </div>
    </Backdrop>

}