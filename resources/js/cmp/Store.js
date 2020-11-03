import { set } from 'lodash';
import React, {useState, useEffect} from 'react';
import '../css/Store.css';
import Gear from '../storage/gear.svg';
import Backdrop from './Backdrop';
import StoreMenu from './StoreMenu';


export default function Store(props) {

    const [list, setlist] = useState( false);
    const [stores, setStores] = useState(null);
    const [storeMenuOpen, setStoreMenuOpen] = useState(false);

    useEffect(() => {
        window.axios.get(window.location.origin + '/stores')
            .then(stores => {
                props.setActiveStore(stores.data[Object.keys(stores.data)[0]])
                setStores(stores.data);
            })
            .catch( err => console.log(err));
    }, []);
    const updateStores = (stores, active=null) => {
        setStores({
            ...stores,
        })
        if(active) props.setActiveStore(active);
    }

    let storeList = null;

    if(stores) {
        storeList = Object.keys(stores).map( 
            (storeKey, i) => {
            const store = stores[storeKey];
            if(store.id !== props.active.id) {
                return <div onClick={() => props.setActiveStore(store)}  className="CPStoresItem" key={`storeLI${i}`}>{store.name}</div>;
            }
        });
    }
    
    return <div className="CPStore">
                <span>Store:</span>
                <div onClick={() => setlist(!list)} className="CPStoreBtn">
                    {props.active ? props.active.name : 'loading...'} 
                    { list ?  <div className="CPStoresList">{storeList}</div> : null}
                </div>
                <img onClick={() => setStoreMenuOpen(!storeMenuOpen)} src={Gear}></img>
                {storeMenuOpen ? 
                    <Backdrop>
                        <StoreMenu
                           closeSwitch={() => setStoreMenuOpen(false)}
                           updateStores = {updateStores}
                           stores={stores}
                        />
                    </Backdrop> : null
                    }
          </div>
}