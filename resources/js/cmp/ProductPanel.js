import React, {useState} from 'react';
import '../css/SettingsMenu.css';
import TextInput from '../cmp/TextInput';


export default function ProductPanel(props)  {
    const [productData, setProductData] = useState({
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
            storeId : props.activeStore.id,
            productData:productData
        };
        window.axios.post(url, data)
        .then( res =>{
            console.log(res);
            props.closePanel();
        })
        .catch( err=> console.log(err));
    }
        return <div className="SettingsMenu">
                <form>
                    <h1>{props.create ? 'Creater Product' : 'Edit Product'}</h1>
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
                  
                    <div style={{margin:'2rem 0', flexDirection: "row"}} className="FormGroup">
                        <button  
                            type="button"
                            onClick={createProduct}
                            className="SettingsBtn" >
                            {props.create ? 'CREATE' : 'SAVE'}
                        </button>
                        {!props.create ? 
                        <button  
                            type="button"
                            className="SettingsBtn" >
                            REMOVE
                        </button> : null
                        }
                        <button onClick={props.closePanel}  type="button" className="SettingsBtn">CLOSE</button>
                    </div>
                </form>              
            </div>
      
}