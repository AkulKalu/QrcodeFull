import React ,{Fragment} from 'react';
import TextInput from '../InputElements/TextInput';
import TextArea from '../InputElements/TextArea';
import Currency from '../InputElements/Currency';
import Toggle from '../InputElements/Toggle';


export default function Form(props) {
    let {inputChange, productData, errors, state} = props;

    return <Fragment>
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