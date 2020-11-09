import React, {useState} from 'react';
import TextInput from '../cmp/TextInput';
import SelectList from './SelectList';
import BasicPanel from './BasicPanel';
import StripeLogo from '../storage/StripeLogo.svg';
import PayPalLogo from '../storage/PayPal.svg';

export default function StoreMenu(props) {
        const [storeData, setStoreData] = useState({...props.stores[0]})
        const [changed, setChanged] = useState(false);
   
        const inputChange = (value, key) => {
            setStoreData({
                ...storeData,
                [key]: value,
            });

            if(!changed) setChanged(true);
        }

        const storeSwitch = e => {
            const storeInd = parseInt(e.target.value);
            const store = props.stores[storeInd];
            setStoreData({...store});
            if(changed) setChanged(false) ;
        }

        const createStore = () => {
            const url =  window.location.origin + '/stores';
            //Clean object of ids
            const data = {}
            Object.keys(props.stores[0]).forEach( key => data[key]=storeData[key]);

            window.axios.post(url, data)
            .then( res => {
                props.closePanel();
                props.updateStores(res.data.stores, res.data.created);
            })
            .catch( err => console.log(err));
        }

        const editStore = () => {
            const url =  window.location.origin + '/stores' + `/${storeData.id}`;
            const data = {
                _method: 'PATCH',
            }
            Object.keys(props.stores[0]).forEach( key => data[key]=storeData[key]);

            window.axios.post(url, data)
            .then( res => {
                props.closePanel();
                props.updateStores(res.data.stores, res.data.updated);
            })
            .catch( err => console.log(err));
        }
        
        const removeStore = () => {
            const confirmed = confirm('Deleting the store will also remove all its product. Are you sure?');
            
            if(confirmed) {
                const url = window.location.origin + '/stores' + `/${storeData.id}`;
                const data = {
                    _method: 'DELETE'
                }
                window.axios.post(url, data)
                .then( res =>{
                    props.closePanel();
                    props.updateStores(res.data, res.data[0]);
                })
                .catch( err => console.log(err));
            }
        }
       
        const  stores = props.stores.map( (store, i) => {
                if(i>0) {
                    return <option  key={`storeOption${i}`} value={i}>{store.name}</option>
                    }
                }
            );
       
        let panelButtons = [
            {
                name: storeData['id'] ? 'EDIT': 'CREATE' ,
                onClick : storeData['id'] ? editStore  : createStore,
            },
            {
                name: "REMOVE",
                onClick : removeStore,
                disabled: !storeData['id'],
                className: !storeData['id'] ?"SettingsBtnDisabled": "SettingsBtn" 
            },
            {
                name: 'CLOSE',
                onClick : props.closePanel
            },
        ]

        return <BasicPanel name="Setup Store" buttons={panelButtons}>
                    <SelectList 
                        select = {storeSwitch}  
                        storeMenu 
                        GroupStyle={{paddingBottom: '1rem'}} 
                        options={stores} 
                    />
                    <TextInput  
                        onChange = {e => inputChange(e.target.value, 'name')} 
                        name="Name"
                        value={storeData.name} 
                    />
                    <TextInput  
                        onChange = {e => inputChange(e.target.value, 'website')} 
                        name="Website" 
                        value={storeData.website}
                    />

                    <div style={{paddingTop:'1rem'}}>
                        <div className="FormGroup">
                            <img alt="stripe" src={StripeLogo}></img>
                        </div>
                        <TextInput
                            onChange = {e => inputChange(e.target.value, 'stripe_public_key')}
                            name = "Public Key"
                            value={storeData.stripe_public_key} 
                        />
                         <TextInput
                            onChange = {e => inputChange(e.target.value, 'stripe_private_key')}
                            name = "Private Key"
                            value={storeData.stripe_private_key} 
                        />
                    </div>
                    <div style={{paddingTop:'1rem'}}>
                        <div className="FormGroup">
                            <img alt="PayPal" src={PayPalLogo}></img>
                        </div>
                        <TextInput
                            onChange = {e => inputChange(e.target.value, 'paypal_client_id')}
                            name = "Client Id"
                            value={storeData.paypal_client_id} 
                        />
                         <TextInput
                            onChange = {e => inputChange(e.target.value, 'paypal_private_key')}
                            name = "Private Key"
                            value={storeData.paypal_private_key} 
                        />
                    </div>
                   
                </BasicPanel>
}