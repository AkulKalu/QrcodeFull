import React, {useState, useEffect} from 'react';
import '../css/Store.css';
import Gear from '../storage/gear.svg';
import PanelSwitch from './PanelSwitch';
import StoreMenu from './StoreMenu';
import Backdrop from './Backdrop';


export default function Store(props) {

    const [list, setlist] = useState( false);
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
        window.axios.get(window.location.origin + '/stores')
            .then(stores => {
                props.setActiveStore(stores.data[0])
   
                setStores([emptyStore, ...stores.data]);
            })
            .catch( err => console.log(err));
    }, []);

    const updateStores = (stores, active=null) => {
        if(active) props.setActiveStore(active);
        setStores([emptyStore, ...stores])
    }

     const  storeList = stores.map((store, i) => {
            if(i > 1) {
                return <div onClick={() => props.setActiveStore(store)}  className="CPStoresItem" key={`storeLI${i}`}>{store.name}</div>;
            }
            
        });
  
    
    return <div className="CPStore">
                <span>Store:</span>
                <div onClick={() => setlist(!list)} className="CPStoreBtn">
                    {props.active ? props.active.name : 'loading...'} 
                    { list ?  <div className="CPStoresList">{storeList}</div> : null}
                </div>

                <PanelSwitch panel={StoreMenu} panelProps={{ stores: stores, updateStores: updateStores }}>
                    <img src={Gear}></img>
                </PanelSwitch>
               
          </div>
}