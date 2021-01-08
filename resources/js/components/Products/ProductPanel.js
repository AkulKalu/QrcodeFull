import React, {Fragment, useState, useContext} from 'react';
import TextInput from '../InputElements/TextInput';
import TextArea from '../InputElements/TextArea';
import Panel from '../Shared/Panel';
import ProductPreview from './ProductPreview';
import Currency from '../InputElements/Currency';
import Toggle from '../Shared/Toggle';
import {store} from '../HOC/StateProvider';

export default function ProductPanel(props)  {
    const {state, dispatch} = useContext(store);
    const [productData, setProductData] = useState(props.data ?   {...props.data} : {...state.products.new});
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
    const close = res => {
        if(res) {
            props.closePanel();
        }
    }

    const create = () => {
        const data = {
            store_id : state.stores.active.id,
            ...productData,
            theme: colorPallete
        };
        
        dispatch.products.create(data)
        .then( res =>{
           close(res);
        })
    }

    const edit = () => {
        const data = {
            store_id: productData.store_id,
            theme: colorPallete
        };

        Object.keys(state.products.new).forEach(key => data[key] = productData[key]);

        dispatch.products.edit(productData.id, data, productData.idx)
        .then( res =>{
            close(res);
        })
    }
    const remove = () => {
        dispatch.products.delete(productData.id, productData.store_id, productData.idx)
        .then( res =>{
            close(res);    
        })
    }
    const buttons = {
        create: { 
            name : 'CREATE' ,
            onClick:   create,
        },
        edit: { 
            name : 'EDIT',
            onClick:   edit,
        },
        remove:{ 
            name: 'REMOVE',
            onClick: remove
        },
        close: {
            name: 'CLOSE',
            onClick: props.closePanel
        }
    };

    let editButtons = ['edit', 'remove', 'close'].map( btn => buttons[btn]);
    let createButtons = ['create', 'close'].map( btn => buttons[btn]);
    console.log(typeof props.data.theme, colorPallete);
    return <Panel 
                name = {props.create ? "CREATE PRODUCT" : "EDIT PRODUCT"}
                buttons={props.create ? createButtons : editButtons}
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
                                            dataList = {state.products.categories}
                                            value={productData.category} 
                                            error = {props.errors['category']}
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
                                    error = {props.errors['price']}
                                />
                                <Currency current={productData.currency} onChange={inputChange}  />
                            </div>
                            <div className="Group-half jus-end ">
                                <TextInput
                                    wrap = "Group-col"
                                    onChange = {e => inputChange(e.target.value, 'stock')}
                                    name = "Stock"
                                    value={productData.stock}  
                                    error = {props.errors['stock']}
                                />
                            </div>
                            </div> 
                            <div className = "Group-row">
                                <div className = "Group-half">
                                    <div className="Group-col">
                                        <label>Active</label>
                                        <Toggle on={productData.active} onToggle= {() => inputChange(Number(!productData.shipping), 'active')} />
                                    </div>
                                    
                                </div>
                                <div className = "Group-half jus-end ">
                                    <div className="Group-col">
                                            <label>Shipps</label>
                                            <Toggle on={productData.shipping} onToggle= {() => inputChange(Number(!productData.shipping), 'shipping')}/>
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
                                error = {props.errors['url']}
                            />
                            <TextInput
                                wrap = "Group-col"
                                onChange = {e => inputChange(e.target.value, 'image_url')}
                                name = "Image Url"
                                value={productData.image_url} 
                                error = {props.errors['image_url']}
                            />  
                            </Fragment>
                        }
                >       
        </Panel>
      
}