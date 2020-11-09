import React, {useEffect, useState} from 'react';
import Product from './Product';
import TableHeader from './TableHeader';

import '../css/Table.css';

export default function Table(props) {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
  
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

    useEffect( () => {
        if(props.toAdd) {
            let updated = [...products];
            updated.unshift(props.toAdd)
            setProducts(updated);
        }
    }, [props.toAdd])
    
    const editProduct = (toEdit, ind) => {
        let updated = [...products];
        updated[ind] = toEdit;
        setProducts(updated);
    }
    const removeProduct =  ind => {
        let updated = [...products];
        updated.splice(ind, 1);
        setProducts(updated);
    }
    const sortProducts = sortFun => {
        let sorted = [...products];
        sorted.sort(sortFun);
        setProducts(sorted);
    }
    let tableData = [];
    if(props.table === 'products') {
            tableData = products.map((product, i)=> {
            product.index = i;
            return <Product  key={`product${i}`} product={product} removeProduct={removeProduct}  editProduct={editProduct} />
        })
    }else{
            tableData = transactions.map((transaction, i)=> {
            return <div></div> });
    }
    

 
    return <div className="TBCont">
                <TableHeader sortProducts={sortProducts} />
                <div className="TBTable">
                    {tableData.length ? tableData : <span>{props.table === 'products' ? 'Add Products' : 'No Transactions' }</span>}
                </div>
            </div>
}