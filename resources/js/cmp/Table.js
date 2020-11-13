import React, {useEffect, useState} from 'react';
import Product from './Product';
import TableHeader from './TableHeader';

import '../css/Table.css';

export default function Table(props) {
    const [products, setProducts] = useState([]);

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
    const applyFilter = product => {
        if(!props.filter) {
            return product
        }
        const filters = ['name', 'manufacturer', 'price', 'id'];

        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(props.filter.length)}</span>
        </span>

        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            const colValue = isNaN(product[filter]) ? product[filter]: product[filter].toString();
            const match = colValue.substr(0, props.filter.length);
            
            if(match.toLowerCase() === props.filter) {
                let filtered = {...product};
                filtered[filter] = highlight(colValue, match)
                return filtered;
            }
        }

        return false
    }
   
    let tableData = products.map((product, i)=> {
            product = applyFilter(product);
            if(product) {
                product.index = i;
                return <Product  key={`product${i}`} product={product} removeProduct={removeProduct}  editProduct={editProduct} />
            }
        })
  
    
    
 
    return <div className="TBCont">
                <TableHeader sortProducts={sortProducts} />
                <div className="TBTable">
                    {tableData.length ? tableData : <span>Add Products</span>}
                </div>
            </div>
}