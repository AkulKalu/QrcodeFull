import React, {useState} from 'react';
import TextInput from '../cmp/TextInput';
import SelectList from './SelectList';
import BasicPanel from './BasicPanel';
import StripeLogo from '../storage/StripeLogo.svg';
import PayPalLogo from '../storage/PayPal.svg';
import {createStore, deleteStore , editStore} from '../Functions/server';

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

        const create = () => {
            const data = {}
            Object.keys(props.stores[0]).forEach( key => data[key]=storeData[key]);   //Clean object of ids
            console.log(data, 'sent');
            createStore(data)
            .then( res => {
                console.log(res);
                // props.closePanel();
                // props.updateStores(res.stores, res.created);
            })
            .catch( res => console.log(res))
        }

        const edit = () => {
            const data = {}
            Object.keys(props.stores[0]).forEach( key => data[key]=storeData[key]);
            editStore(storeData.id, data )
            .then( res => {
                props.closePanel();
                props.updateStores(res.stores, res.updated);
            })
        }
        
        const remove = () => {
            const confirmed = confirm('Deleting the store will also remove all its product. Are you sure?');
            if(confirmed) {
                deleteStore(storeData.id)
                .then(stores =>{
                    props.closePanel();
                    props.updateStores(stores, stores[0]);
                })
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
                onClick : storeData['id'] ? edit  : create,
            },
            {
                name: "REMOVE",
                onClick : remove,
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
                        validate = 'name'
                    />
                    <TextInput  
                        onChange = {e => inputChange(e.target.value, 'website')} 
                        name="Website" 
                        value={storeData.website}
                        validate = 'website'
                    />

                    <div style={{paddingTop:'1rem'}}>
                        <div className="FormGroup">
                            <img alt="stripe" src={StripeLogo}></img>
                        </div>
                        <TextInput
                            onChange = {e => inputChange(e.target.value, 'stripe_public_key')}
                            name = "Public Key"
                            value={storeData.stripe_public_key} 
                            validate = 'stripe_public_key'
                        />
                         <TextInput
                            onChange = {e => inputChange(e.target.value, 'stripe_private_key')}
                            name = "Private Key"
                            value={storeData.stripe_private_key} 
                            validate = 'stripe_private_key'
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
                            validate = 'paypal_client_id'
                        />
                         <TextInput
                            onChange = {e => inputChange(e.target.value, 'paypal_private_key')}
                            name = "Private Key"
                            value={storeData.paypal_private_key} 
                            validate = 'paypal_private_key'
                        />
                    </div>
                   
                </BasicPanel>
}