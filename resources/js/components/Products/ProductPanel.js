import React, {Fragment, useState} from 'react';
import TextInput from '../InputElements/TextInput';
import TextArea from '../InputElements/TextArea';
import Panel from '../Shared/Panel';
import ProductPreview from './ProductPreview';
import Currency from '../InputElements/Currency';
import Toggle from '../Shared/Toggle';
import {createProduct, editProduct, deleteProduct} from '../../Functions/server';

export default function ProductPanel(props)  {
    
    const emptyProduct = {
        category: '',
        model: '',
        manufacturer: '',
        manufacturer_website: '',
        image_url:'',
        url:'',
        price: 0,
        description:'',
        active: true,
        shipping: true,
        stock: 1,
        currency: '$'
    }

    const [productData, setProductData] = useState(props.data ?   {...props.data} : emptyProduct);
    const [colorPallete, setcolorPallete] = useState(props.data ?  props.data.theme : {
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
            theme: colorPallete
        };
        Object.keys(emptyProduct).forEach(key => {
            if(productData[key] !== '') {
                data[key] = productData[key]
            }  
        });
        createProduct(data)

        .then( res =>{
            if(res.status === 200) {
                props.closePanel();
                props.addProduct(res.data);
            }
        })
    }
    const edit = () => {
        const data = {
            store_id: productData.store_id,
            theme: colorPallete
        };

        Object.keys(emptyProduct).forEach(key => data[key] = productData[key]);

        editProduct(props.data.id, data)
        .then( res =>{
            if(res.status === 200) {
                props.closePanel();
                props.updateProduct(res.data, productData.index)
            }
        })
    }
    const remove = () => {
        deleteProduct(props.data.id, productData.store_id)
        .then( res =>{
            if(res.status === 200) {
                props.closePanel();
                props.removeProduct( productData.index)
            }    
        })
    }
    const panelButtons = {
        add: { 
            name : 'ADD' ,
            onClick:   edit,
        },
        edit: { 
            name : 'EDIT',
            onClick:   edit,
        },
        remove:{ 
            name: 'REMOVE',
            onClick: remove
        },
    };
    
    return <Panel 
                name = {props.create ? "CREATE PRODUCT" : "EDIT PRODUCT"}
                buttons={props.buttons.map( btn => panelButtons[btn])}
                onClose = {props.closePanel} 
                right={
                    <ProductPreview 
                        colorPallete={colorPallete} 
                        setColorPallete={setcolorPallete} 
                        product={productData}
                    />} 
                left = {
                    <Fragment>
                         <h3>Product</h3>
                        <div className = "Group-row">
                            <div className = "Group-half">
                                    <TextInput
                                            wrap = "Group-col"
                                            onChange = {e => inputChange(e.target.value, 'category')}
                                            name = "Category"
                                            dataList = {Array.from(props.categories.keys())}
                                            value={productData.category} 
                                            validate = 'name'
                                        />
                            </div>
                            <div className = "Group-half jus-end ">
                                    <TextInput
                                        wrap = "Group-col"
                                        onChange = {e => inputChange(e.target.value, 'model')}
                                        name = "Model"
                                        value={productData.model}  
                                    />
                            </div>
                        </div>
                    
                        <div className="Group-row">
                            <div className="Group-half">
                                <TextInput 
                                    wrap = "Group-col"
                                    onChange = {e => inputChange(e.target.value, 'price')}
                                    name = "Price"
                                    value={productData.price}  
                                    validate = 'price'
                                />
                                <Currency current={productData.currency} onChange={inputChange}  />
                            </div>
                            <div className="Group-half jus-end ">
                                <TextInput
                                    wrap = "Group-col"
                                    onChange = {e => inputChange(e.target.value, 'stock')}
                                    name = "Stock"
                                    value={productData.stock}  
                                    validate = 'stock'
                                />
                            </div>
                            </div> 
                            <div className = "Group-row">
                                <div className = "Group-half">
                                    <div className="Group-col">
                                        <label>Active</label>
                                        <Toggle on={productData.active} onToggle= {() => inputChange(!productData.active, 'active')} />
                                    </div>
                                    
                                </div>
                                <div className = "Group-half jus-end ">
                                    <div className="Group-col">
                                            <label>Shipps</label>
                                            <Toggle on={productData.shipping} onToggle= {() => inputChange(!productData.shipping, 'shipping')}/>
                                    </div>
                                </div>
                            </div>  
                        
                        <h3>Additional</h3>
                        
                            <TextInput
                                wrap = "Group-col"
                                onChange = {e => inputChange(e.target.value, 'manufacturer')}
                                name = "Manufacturer"
                                value={productData.manufacturer}  
                            />
                            <TextArea 
                                wrap = "Group-text" 
                                onChange = {e => inputChange(e.target.value, 'description')}
                                name="Description"  
                                value={productData.description} 
                            />
                            <TextInput
                                wrap = "Group-col"
                                onChange = {e => inputChange(e.target.value, 'url')}
                                name = "Product Link"
                                value={productData.url}  
                                validate = 'url'
                            />
                            <TextInput
                                wrap = "Group-col"
                                onChange = {e => inputChange(e.target.value, 'image_url')}
                                name = "Image Url"
                                value={productData.image_url} 
                                validate = 'image_url'
                            />  
                            </Fragment>
                        }
                >       
        </Panel>
      
}