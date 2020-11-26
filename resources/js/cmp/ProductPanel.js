import React, {useState} from 'react';
import TextInput from './TextInput';
import BasicPanel from './BasicPanel';
import ProductPreview from './ProductPreview';
import Currency from './Currency';
import {createProduct, editProduct, deleteProduct} from '../Functions/server';

export default function ProductPanel(props)  {
    const emptyProduct = {
        category: '',
        model: '',
        manufacturer: '',
        manufacturer_website: '',
        image_url:'',
        url:'',
        price: '',
        description:'',
        active: 1,
        currency: '$'
    }
    const [productData, setProductData] = useState(props.create ? {...emptyProduct} : {...props.product});
    const [colorPallete, setcolorPallete] = useState({
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
    });

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
        .then( res =>{
            if(res.status === 200) {
                console.log(res.data);
                props.closePanel();
                props.addProduct(res.data);
            }
        })
    }
    const edit = () => {
        const data = {
            store_id: productData.store_id
        };
        Object.keys(emptyProduct).forEach(key => data[key] = productData[key]);
        editProduct(props.product.id, data)
        .then( res =>{
            if(res.status === 200) {
                props.closePanel();
                props.updateProduct(res.data, productData.index)
            }
        })
    }
    const remove = () => {
        deleteProduct(props.product.id, productData.store_id)
        .then( res =>{
            if(res.status === 200) {
                props.closePanel();
                props.removeProduct( productData.index)
            }    
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
    ]
    return <BasicPanel preview={<ProductPreview colorPallete={colorPallete} setColorPallete={setcolorPallete} product={productData}/>} buttons={panelButtons} >
                <TextInput
                    style={{marginTop: '8%'}}
                    onChange = {e => inputChange(e.target.value, 'category')}
                    name = "Category"
                    value={productData.category} 
                    validate = 'name'
                />
                 <TextInput
                    onChange = {e => inputChange(e.target.value, 'model')}
                    name = "Model"
                    value={productData.model}  
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
                    validate = 'manufacturer_website'
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
                    validate = 'url'
                />
                <TextInput
                    onChange = {e => inputChange(e.target.value, 'image_url')}
                    name = "Image Url"
                    value={productData.image_url} 
                    validate = 'image_url'
                />
                    <TextInput
                        style={{width: '50%'}}
                        onChange = {e => inputChange(e.target.value, 'price')}
                        name = "Price"
                        value={productData.price}  
                        validate = 'price'
                    />
                    <Currency current={productData.currency} onChange={inputChange}  />
                     
        </BasicPanel>
      
}