import React, {useEffect, useState} from 'react';
import Product from './Product';
import TableHeader from './TableHeader';
import {getProducts} from '../Functions/server';

import '../css/Table.css';

export default function Table(props) {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        if(props.activeStore) {
            getProducts(props.activeStore.id)
            .then( res =>setProducts(res.data))
        }
    }, [props.activeStore])

    useEffect( () => {
        if(props.toAdd) {
            let updated = [...products];
            updated.unshift(props.toAdd)
            setProducts(updated);
        }
    }, [props.toAdd])
  
   
    const updateProduct = (toEdit, ind) => {
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
    const categoryList = () => {
        console.log(products);
        return new Set(products.map( prod => prod.category));
        
    }
    const applyFilter = product => {
        
        if(!props.filter || !props.filter.applyTo) {
            return product
        }
       
        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(props.filter.search.length)}</span>
        </span>

        for (const key in props.filter.applyTo) {
            if (props.filter.applyTo[key]) {
                const colValue = isNaN(product[key]) ? product[key]: product[key].toString();
                const match = colValue.substr(0, props.filter.search.length);
            
                if(match.toLowerCase() === props.filter.search) {
                    let filtered = {...product};
                    filtered[key] = highlight(colValue, match)
                    return filtered;
                }
            }
        }  

        return false
    }
   
    let tableData = products.map((product, i)=> {
            product = applyFilter(product);
            if(product) {
                product.index = i;
                return <Product  key={`product${i}`} product={product} categories={categoryList()} removeProduct={removeProduct}  updateProduct={updateProduct} />
            }
        })
    
 
    return <div className="TBCont">
                <TableHeader sortProducts={sortProducts} />
                <div className="TBTable">
                    {tableData.length ? tableData : <span>Add Products</span>}
                </div>
            </div>
}