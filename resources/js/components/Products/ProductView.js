import React, {useState, useEffect} from 'react';
import './scss/ProductView.scss';
import Backdrop from '../Shared/Backdrop';
import Loader from '../Visual/Loader';
import {showProduct} from '../server';


export default function ProductView(props) {
    let {data, close, switchAction} = props;
    
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
                                <table  >
                                    <caption>
                                        STORE
                                    </caption>
                                    <tr>
                                        <td className="Title">name</td>
                                        <td>{product.store.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">id</td>
                                        <td>{product.store.id}</td>
                                    </tr>
                                </table>
                                <table>
                                    <caption>
                                        PRODUCT
                                    </caption>
                                    <tr>
                                        <td className="Title">id</td>
                                        <td>{product.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">category</td>
                                        <td>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">manufacturer</td>
                                        <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">model</td>
                                        <td>{product.model}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">price</td>
                                        <td>{product.price + product.currency}</td>
                                    </tr>
                                    <tr>
                                        <td className="Title">stock</td>
                                        <td>{product.stock}</td>
                                    </tr>
                                </table>
                            </div>
                        
                        </div>
                    }
                </div>
    </Backdrop>

}