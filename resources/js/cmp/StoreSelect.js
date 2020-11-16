import React from 'react';
import '../css/Store.css';

export default function StoreSelect(props) {
    const storeList = props.stores.map((store, i) => {
            if(i > 0 && store.name !== props.active.name) {
                return <div onClick={() => {
                    props.closePanel()
                    props.setActiveStore(store)
                }}  
                className="CPStoresItem" key={`storeLI${i}`}>{store.name}</div>;
            }
        });
  
    return <div className="CPStoresList">
                {storeList}
           </div>
}