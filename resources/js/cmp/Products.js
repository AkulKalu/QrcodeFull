import React, {useEffect, useState, Fragment} from 'react';
import Product from './Product';
import ProductPanel from './ProductPanel';
import PanelSwitch from './PanelSwitch';
import TableHeader from './TableHeader';
import Button from './Button';
import Table from './Table';
import {getProducts} from '../Functions/server';


export default function Products(props) {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        if(props.activeStore) {
            getProducts(props.activeStore.id)
            .then( res =>setProducts(res.data))
        }
    }, [props.activeStore])

  
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
   
    let tableColumns = {
        Image: {
            width: '20%',
        },
        Category: {
            width: '10%',
            sort:true,
        },
        Model: {
            width: '20%',
            sort:true,
        },
        Manufacturer : {
            width: '20%',
            sort:true,
        },
        Price : {
            width: '10%',
            sort:true,
        },
        Active : {
            width: '10%',
            sort:true,
        },
        QrCode : {
            width: '10%',
        }
    }
    
    return <Fragment>
                 <PanelSwitch 
                    panel={ProductPanel} 
                    panelProps={{
                        activeStore : props.activeStore,
                        create: true,
                        addProduct: addProduct,
                        categories: categoryList()
                    }}>
                    <Button name="new" className="ProductsAddBtn" />
                </PanelSwitch>
                <Table 
                    header={<TableHeader columns={tableColumns} sort={sortProducts} />} 
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
            </Fragment>
}


