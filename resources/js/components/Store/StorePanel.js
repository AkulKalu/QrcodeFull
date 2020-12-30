import React, {Fragment, useState} from 'react';
import TextInput from '../InputElements/TextInput';
import Panel from '../Shared/Panel';
import StripeLogo from '../../storage/StripeLogo.svg';
import PayPalLogo from '../../storage/PayPal.svg';
import {createStore, deleteStore , editStore} from '../../Functions/server';

export default function StoreMenu(props) {
        const [storeData, setStoreData] = useState(props.store ? props.store : {
            name: '',
            website:'',
            email: '',
            phone: '',
            stripe_public_key: '',
            stripe_private_key: '',
            paypal_client_id: '',
            paypal_private_key: '',
        })
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
            const confirmed = window.confirm('Deleting the store will also remove all its product. Are you sure?');
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
            },
        }

        let panelButtons = props.buttons.map( btn => buttons[btn])

        return <Panel 
                    name = {props.store ? 'EDIT STORE' : 'CREATE STORE'} 
                    buttons={panelButtons}
                    onClose = {props.onClose}
                    left = {
                        <Fragment>
                            <h3>Store</h3>
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'name')} 
                                name="Name"
                                value={storeData.name}
                                validate = 'name'
                                />
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'website')} 
                                name="Website" 
                                value={storeData.website}
                                validate = 'website'
                            />
                            <h3>Contact</h3>
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'email')} 
                                name="Email"
                                value={storeData.email}
                                validate = 'name'
                                />
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'phone')} 
                                name="Phone" 
                                value={storeData.phone}
                                validate = 'website'
                            />
                        </Fragment>
                    }
                    right = {
                        <Fragment>
                                <h3>Stripe API</h3>
                                <TextInput
                                    wrap = "Group-col" 
                                    onChange = {e => inputChange(e.target.value, 'stripe_public_key')}
                                    name = "Public Key"
                                    value={storeData.stripe_public_key} 
                                    validate = 'stripe_public_key'
                                />
                                <TextInput
                                    wrap = "Group-col" 
                                    onChange = {e => inputChange(e.target.value, 'stripe_private_key')}
                                    name = "Private Key"
                                    value={storeData.stripe_private_key} 
                                    validate = 'stripe_private_key'
                                />
                                <h3>PayPal API</h3>
                                <TextInput
                                    wrap = "Group-col"     
                                    onChange = {e => inputChange(e.target.value, 'paypal_client_id')}
                                    name = "Client Id"
                                    value={storeData.paypal_client_id} 
                                    validate = 'paypal_client_id'
                                />
                                <TextInput
                                    wrap = "Group-col" 
                                    onChange = {e => inputChange(e.target.value, 'paypal_private_key')}
                                    name = "Private Key"
                                    value={storeData.paypal_private_key} 
                                    validate = 'paypal_private_key'
                                />
                        </Fragment>
                    } >
                </Panel>
}