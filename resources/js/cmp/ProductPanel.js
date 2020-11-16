import React, {useState} from 'react';
import TextInput from './TextInput';
import BasicPanel from './BasicPanel';
import {createProduct, editProduct, deleteProduct} from '../Functions/server';

export default function ProductPanel(props)  {
    const emptyProduct = {
        name: '',
        manufacturer: '',
        manufacturer_website: '',
        image_url:'',
        url:'',
        price: '',
        description:'',
    }
    const [productData, setProductData] = useState(props.create ? {...emptyProduct} : {...props.product});

    const inputChange = (value, key) => {
        setProductData({
            ...productData,
            [key]:value
        })
    }

    const create = () => {
        const data = {
            store_id : props.activeStore.id,
            ...productData
        };
        createProduct(data)
        .then( product =>{
            props.closePanel();
            props.addProduct(product);
        })
    }
    const edit = () => {
        const data = {
            store_id: productData.store_id
        };
        Object.keys(emptyProduct).forEach(key => data[key] = productData[key]);
        editProduct(props.product.id, data)
        .then( product =>{
            props.closePanel();
            props.updateProduct(product, productData.index)
        })
    }
    const remove = () => {
        deleteProduct(props.product.id, productData.store_id)
        .then( status =>{
            props.closePanel();
            props.removeProduct( productData.index)
        })
    }
    const panelButtons = [
        { 
            name : props.create ? 'CREATE' : 'EDIT',
            onClick:  props.create ? create : edit,
        },
        !props.create ? { 
            name: 'REMOVE',
            onClick: remove
        } : null,
        {
            name: 'CLOSE',
            onClick : props.closePanel
        },
    ]
    return <BasicPanel name={props.create ? 'Create Product' : 'Edit Product'} buttons={panelButtons} >
                <TextInput
                    style={{marginTop: '15%'}}
                    onChange = {e => inputChange(e.target.value, 'name')}
                    name = "Name"
                    value={productData.name}  
                />
                <TextInput
                    onChange = {e => inputChange(e.target.value, 'manufacturer')}
                    name = "Manufacturer"
                    value={productData.manufacturer}  
                />
                    <TextInput
                    onChange = {e => inputChange(e.target.value, 'manufacturer_website')}
                    name = "Manufacturer Website"
                    value={productData.manufacturer_website}  
                />
                <div className="FormGroup">
                    <label className="SettingsMenuLabel" htmlFor="description">Description</label>
                    <textarea  
                    onChange = {e => inputChange(e.target.value, 'description')}
                        name="Description"  value={productData.description}>
                    </textarea>
                </div>
                <TextInput
                    onChange = {e => inputChange(e.target.value, 'url')}
                    name = "Product Link"
                    value={productData.url}  
                />
                <TextInput
                    onChange = {e => inputChange(e.target.value, 'image_url')}
                    name = "Image Url"
                    value={productData.image_url}  
                />
                <TextInput
                    onChange = {e => inputChange(e.target.value, 'price')}
                    name = "Price"
                    value={productData.price}  
                />          
        </BasicPanel>
      
}