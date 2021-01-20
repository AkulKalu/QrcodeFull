import React, {Fragment, useState, useContext} from 'react';
import TextInput from '../InputElements/TextInput';
import Panel from '../Shared/Panel';
import {store} from '../HOC/StateProvider';

export default function StoreMenu(props) {
        const {state, dispatch} = useContext(store);
        const [storeData, setStoreData] = useState(props.store ? props.store : {...state.stores.new});
   
        const inputChange = (value, key) => {
            setStoreData({
                ...storeData,
                [key]: value,
            });
        }
      
        const close = (statusOk) => {
            if(statusOk) {
                props.close();
            }
        }

        const create = () => {
            dispatch.stores.create(storeData)
            .then( res => {
                close(res); 
            })
            
        }

        const edit = () => {
            const data = {}
            Object.keys(state.stores.new).forEach( key => data[key]=storeData[key]);
            dispatch.stores.edit(storeData.id, data )
            .then( res => {
                close(res); 
            });
        }
        
        const remove = () => {
            const confirmed = window.confirm('Deleting the store will also remove all its product. Are you sure?');
            if(confirmed) {
                dispatch.stores.delete(storeData.id, (state.stores.active.id === storeData.id))
                .then(res =>{
                    close(res);
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
            close: {
                name : "CLOSE",
                onClick : props.close
            }
        }

        let editButtons = ['edit', 'remove', 'close'].map( btn => buttons[btn]);
        let createButtons = ['create', 'close'].map( btn => buttons[btn]);

        return <Panel 
                    name = {props.store ? 'EDIT STORE' : 'CREATE STORE'} 
                    buttons={props.create ? createButtons : editButtons}
                    switchAction = {props.switchAction}
                    left = {
                        <Fragment>
                            <h3>Store</h3>
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'name')} 
                                name="Name"
                                value={storeData.name}
                                error = {props.errors['name']}
                                />
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'website')} 
                                name="Website" 
                                value={storeData.website}
                                error = {props.errors['website']}
                            />
                            <h3>Contact</h3>
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'email')} 
                                name="Email"
                                value={storeData.email}
                                error = {props.errors['email']}
                                />
                            <TextInput 
                                wrap = "Group-col" 
                                onChange = {e => inputChange(e.target.value, 'phone')} 
                                name="Phone" 
                                value={storeData.phone}
                                error = {props.errors['phone']}
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
                                    error = {props.errors['stripe_public_key']}
                                />
                                <TextInput
                                    wrap = "Group-col" 
                                    onChange = {e => inputChange(e.target.value, 'stripe_private_key')}
                                    name = "Private Key"
                                    value={storeData.stripe_private_key} 
                                    error = {props.errors['stripe_private_key']}
                                />
                                <h3>PayPal API</h3>
                                <TextInput
                                    wrap = "Group-col"     
                                    onChange = {e => inputChange(e.target.value, 'paypal_client_id')}
                                    name = "Client Id"
                                    value={storeData.paypal_client_id} 
                                    error ={ props.errors['paypal_client_id']}
                                />
                                <TextInput
                                    wrap = "Group-col" 
                                    onChange = {e => inputChange(e.target.value, 'paypal_private_key')}
                                    name = "Private Key"
                                    value={storeData.paypal_private_key} 
                                    error = {props.errors['paypal_private_key']}
                                />
                        </Fragment>
                    } >
                </Panel>
}