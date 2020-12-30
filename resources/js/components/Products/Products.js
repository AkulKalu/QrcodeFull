import React, {useEffect, useState, Fragment} from 'react';
import Product from './Product';
import ProductPanel from './ProductPanel';
import PanelSwitch from '../HOC/PanelSwitch';
import Button from '../InputElements/Button';
import Table from '../Table/Table';
import {getProducts} from '../../Functions/server';


export default function Products(props) {
    let pp = [...Array(40).keys()].map( p => {
        return {
            category: 'Tostersssssssssssssssssssssssssssssssssssssssssssss',
            model: 'zz-100',
            manufacturer: 'Rowenta',
            manufacturer_website: '',
            image_url:'https://api.spektar.rs/storage/products/toster-philips-hd-2637-8788.jpg',
            url:'',
            price: 600,
            description:'',
            active: 1,
            stock: 1,
            currency: '$',
            theme: {
                image: {
                    rgbStr:'rgb(255, 255, 255, 1)',
                    rgb: {
                        r:255,
                        g:255,
                        b:255,
                        a:1,
                    }},
                font: {
                    rgbStr:'rgb(196, 235, 108, 1)',
                    rgb: {
                        r:196,
                        g:235,
                        b:108,
                        a:1,
                    }},
                background: {
                    rgbStr:'rgb(16, 17, 17, 1)',
                    rgb: {
                        r:16,
                        g:17,
                        b:17,
                        a:1,
                    }},
                buttons: {
                    rgbStr:'rgb(196, 235, 108, 1)',
                    rgb: {
                        r:196,
                        g:235,
                        b:108,
                        a:1,
                    }},
            },
        }
    })
    const [products, setProducts] = useState(pp);

    // useEffect( () => {
    //     if(props.activeStore) {
    //         getProducts(props.activeStore.id)
    //         .then( res =>setProducts(res.data))
    //     }
    // }, [props.activeStore])

  
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
   
  
    
    return <Fragment>
                <Table 
                    message = 'Add Products'
                    columns = {props.tabelColumns}
                    data={products}
                    sort = {sortProducts}
                    filter={props.filter}
                    row = {Product}
                    rowProps = {
                        {
                            columns: props.tabelColumns,
                        }
                    }
                    panel={ProductPanel}
                    panelProps = {
                        {
                            categories: categoryList(),
                            removeProduct: removeProduct,
                            updateProduct: updateProduct,
                            buttons : ['edit', 'remove']
                        }
                    }
                    controls = { <PanelSwitch 
                        panel={ProductPanel} 
                        panelProps={{
                            activeStore : props.activeStore,
                            addProduct: addProduct,
                            categories: categoryList(),
                            buttons : ['add']
                        }}
                        element= {Button}
                        elementProps = {{
                            name: 'Add Product',
                            className: 'ProductsAddBtn'
                        }}
                        >
                    </PanelSwitch>}
                />
            </Fragment>
}


