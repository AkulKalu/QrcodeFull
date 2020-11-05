import React, {useEffect, useState} from 'react';
import Product from './Product';
import TableHeader from './TableHeader';

import '../css/Table.css';

export default function Table(props) {
    const [products, setProducts] = useState(null);
  

    useEffect( () => {
        if(props.activeStore) {
            const url = window.location.origin + '/products';
            window.axios.get(url, {params:{storeId: props.activeStore.id}})
            .then( res =>{
               setProducts(res.data);
            })
            .catch( err=> console.log(err));
        }
       
    }, [props.activeStore])

    let productList = null;
    if(products) {
        productList = Object.keys(products).map((key, i)=> {
            const product = products[key];
            return <Product  key={`product${i}`} product={product} />
        })
    }
    return <div className="TBCont">
                <TableHeader />
                <div className="TBTable">
                    {productList}
                </div>
                
            </div>
}