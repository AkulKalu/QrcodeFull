import React, {useEffect, useState, Fragment} from 'react';
import Product from './Product';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';
import ProductsHeader from './ProductsHeader';
import Table from './Table';
import {getProducts} from '../Functions/server';


export default function Products(props) {
    const [products, setProducts] = useState([]);
    let newProduct = null;

    useEffect( () => {
        if(props.activeStore) {
            getProducts(props.activeStore.id)
            .then( res =>setProducts(res.data))
        }
    }, [props.activeStore])

    useEffect( () => {
        if(props.new) {
            console.log('xxx');
            newProduct =  <PanelSwitch 
                panel={ProductPanel} 
                panelProps={{
                    activeStore : props.activeStore,
                    create: true,
                    addProduct: addProduct,
                    categories: categoryList()
            }}/> 
        }
    }, [props.new])
  
   
    const updateProduct = (toEdit, ind) => {
        let updated = [...products];
        updated[ind] = toEdit;
        setProducts(updated);
    }
    const addProduct = toAdd => {
        let updated = [...products];
        updated.unshift(toAdd);
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
        return new Set(products.map( prod => prod.category));
    }
   
    
 console.log(newProduct);
return <Fragment>
            <Table 
                header={<ProductsHeader sort={sortProducts} />} 
                data={products}
                row = {Product}
                rowProps = {
                    {
                        categories: categoryList(),
                        removeProduct: removeProduct,
                        updateProduct: updateProduct
                    }
                }
            />
            {newProduct}
           
        </Fragment>
}


