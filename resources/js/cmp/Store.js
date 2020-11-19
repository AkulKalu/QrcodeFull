import React, {useState, useEffect} from 'react';
import '../css/Store.css';
import Gear from '../storage/gear.svg';
import PanelSwitch from './PanelSwitch';
import StoreMenu from './StoreMenu';
import StoreSelect from './StoreSelect';
import {getStores} from '../Functions/server';



export default function Store(props) {
    const [stores, setStores] = useState([]);

    const emptyStore = {
        name: '',
        website:'',
        stripe_public_key: '',
        stripe_private_key: '',
        paypal_client_id: '',
        paypal_private_key: '',
    }
  
    useEffect(() => {
        getStores()
        .then(res => {
            props.setActiveStore(res.data[0])
            setStores([emptyStore, ...res.data]);
        })
    }, []);

    const updateStores = (stores, active=null) => {
        if(active) props.setActiveStore(active);
        setStores([emptyStore, ...stores])
    }
    
    return <div className="CPStore">
                <span>Store:</span>
                <PanelSwitch panel={StoreSelect} panelProps={{ stores: stores, active: props.active, setActiveStore: props.setActiveStore }} >
                    <div className="CPStoreBtn">
                        {props.active ? props.active.name : 'loading...'} 
                    </div>
                </PanelSwitch>

                <PanelSwitch panel={StoreMenu} panelProps={{ store: emptyStore, updateStores: updateStores , buttons: ['create']}}>
                   <span>new</span>
                </PanelSwitch>
                <PanelSwitch panel={StoreMenu} panelProps={{ store: props.active, updateStores: updateStores  , buttons: ['edit', 'remove']}}>
                   <span>change</span>
                </PanelSwitch>
               
          </div>
}