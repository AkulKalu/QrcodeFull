import React, {Fragment, useState, useContext} from 'react';
import TextInput from '../InputElements/TextInput';
import TextArea from '../InputElements/TextArea';
import Panel from '../Shared/Panel';
import ProductPreview, { themeCoder } from './ProductPreview';
import Currency from '../InputElements/Currency';
import Toggle from '../Shared/Toggle';
import {store} from '../HOC/StateProvider';

export default function ProductPanel({add, data, errors, close : closePanel, switchAction})  {
    const {state, dispatch} = useContext(store);
    const [productData, setProductData] = useState( add ? {...state.products.new} :  {...data} );
    const [colorPallete, setcolorPallete] = useState(themeCoder.fromCode(add ? state.products.new.theme:  data.theme));
    
    const inputChange = (value, key) => {
        setProductData({
            ...productData,
            [key]:value
        })
    }
    const close = res => {
        if(res) {
            closePanel();
        }
    }

    const create = () => {
        const payload = {
            store_id : state.stores.active.id,
            ...productData,
            theme: themeCoder.encode(colorPallete)
        };
        
        dispatch.products.create(payload)
        .then( res =>{
           close(res);
        })
    }

    const edit = () => {
     
        const payload = {
            store_id: productData.store_id,
        };
        Object.keys(state.products.new).forEach(key => payload[key] = productData[key]);
        payload.theme = themeCoder.encode(colorPallete);

        dispatch.products.edit(productData.id, payload, productData.idx)
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
            onClick: closePanel
        }
    };

    let editButtons = ['edit', 'remove', 'close'].map( btn => buttons[btn]);
    let createButtons = ['create', 'close'].map( btn => buttons[btn]);
    
    return <Panel 
                name = {add ? "CREATE PRODUCT" : "EDIT PRODUCT"}
                buttons={add ? createButtons : editButtons}
                switchAction = {switchAction}
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
                                            error = {errors['category']}
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
                                    error = {errors['price']}
                                />
                                <Currency current={productData.currency} onChange={inputChange}  />
                            </div>
                            <div className="Group-half jus-end ">
                                <TextInput
                                    wrap = "Group-col"
                                    onChange = {e => inputChange(e.target.value, 'stock')}
                                    name = "Stock"
                                    value={productData.stock}  
                                    error = {errors['stock']}
                                />
                            </div>
                            </div> 
                            <div className = "Group-row">
                                <div className = "Group-half">
                                    <div className="Group-col">
                                        <label>Active</label>
                                        <Toggle on={productData.active} onToggle= {() => inputChange(Number(!productData.active), 'active')} />
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
                                error = {errors['url']}
                            />
                            <TextInput
                                wrap = "Group-col"
                                onChange = {e => inputChange(e.target.value, 'image_url')}
                                name = "Image Url"
                                value={productData.image_url} 
                                error = {errors['image_url']}
                            />  
                            </Fragment>
                        }
                >       
        </Panel>
      
}