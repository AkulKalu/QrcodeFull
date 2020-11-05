import React, {useState} from 'react';
import TextInput from './TextInput';
import BasicPanel from './BasicPanel';

export default function ProductPanel(props)  {
    const [productData, setProductData] = useState(props.product ? 
        {...props.product}:{
        name: '',
        manufacturer: '',
        manufacturer_website: '',
        image_url:'',
        url:'',
        price: '',
        description:'',
    });
    const inputChange = (value, key) => {
        setProductData({
            ...productData,
            [key]:value
        })
    }

    const createProduct = () => {
        const url = window.location.origin + '/products';
        const data = {
            store_id : props.activeStore.id,
            ...productData
        };
        window.axios.post(url, data)
        .then( res =>{
            console.log(res);
            // props.closePanel();
        })
        .catch( err=> console.log(err));
    }
    const editProduct = () => {
        const url = window.location.origin + '/products' + `/${props.product.id}`;
        const data = {
            _method: 'PATCH',
           ...productData
        };
        window.axios.post(url, data)
        .then( res =>{
            props.closePanel();
        })
        .catch( err=> console.log(err));
    }
        const panelButtons = [
            { 
                name : props.create ? 'CREATE' : 'SAVE',
                onClick:  props.create ? createProduct : editProduct,
            },
            !props.create ? { name: 'REMOVE'} : null,
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