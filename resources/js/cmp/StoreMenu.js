import React, {useState} from 'react';
import TextInput from '../cmp/TextInput';
import SelectList from './SelectList';
import BasicPanel from './BasicPanel';
import StripeLogo from '../storage/StripeLogo.svg';
import PayPalLogo from '../storage/PayPal.svg';
import {createStore, deleteStore , editStore} from '../Functions/server';

export default function StoreMenu(props) {
        const [storeData, setStoreData] = useState({...props.store})
        const [changed, setChanged] = useState(false);
   
        const inputChange = (value, key) => {
            setStoreData({
                ...storeData,
                [key]: value,
            });

            if(!changed) setChanged(true);
        }


        const create = () => {
            const data = {}
            Object.keys(props.store).forEach( key => data[key]=storeData[key]);   //Clean object of ids
            createStore(data)
            .then( res => {
                if(res.status === 200) {
                    props.closePanel();
                    props.updateStores(res.data.stores, res.data.created);
                }        
            })
            .catch( res => console.log(res))
        }

        const edit = () => {
            const data = {}
            Object.keys(props.store).forEach( key => data[key]=storeData[key]);
            editStore(storeData.id, data )
            .then( res => {
                if(res.status === 200) {
                    props.closePanel();
                    props.updateStores(res.data.stores, res.data.updated);
                }
            })
        }
        
        const remove = () => {
            const confirmed = confirm('Deleting the store will also remove all its product. Are you sure?');
            if(confirmed) {
                deleteStore(storeData.id)
                .then(res =>{
                    if(res.status === 200) {
                        props.closePanel();
                        props.updateStores(res.data, res.data[0]);
                    }
                })
            }
        }

        let buttons = {
            create: {
                name: 'CREATE',
                onClick: create
            },
            edit: {
                name: 'EDIT',
                onClick: edit
            },
            remove: {
                name: "REMOVE",
                onClick : remove,
            }
        }

        let panelButtons = props.buttons.map( btn => buttons[btn])

        return <BasicPanel name="Setup Store" buttons={panelButtons}>
                    <TextInput  
                        style={{marginTop: '8%'}}
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