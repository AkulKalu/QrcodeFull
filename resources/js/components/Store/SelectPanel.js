import React, {useContext} from 'react';
import './scss/SelectPanel.scss';
import {store} from '../HOC/StateProvider';
import StorePanel from './StorePanel';
import Backdrop from '../Shared/Backdrop';
import AsSwitch from '../HOC/AsSwitch';
import WithValidator from '../HOC/WithValidator';

let PanelSwitch = AsSwitch(WithValidator(StorePanel));

export default function SelectPanel(props) {
    const {state, dispatch} = useContext(store);

    const switchStore = (store = false) => {
        dispatch.stores.switch(store);
        props.close()
    }
  
    const storeList = state.stores.list.map((store, i) => {
        store.idx = i;
        return <div  key={`storeLI${i}`} className="StoreItem"> 
                        <div className="SelectBtn" onClick={() => switchStore(store)}  
                        >{store.name}</div>
                        <PanelSwitch
                            button={{
                                name : 'ED',
                                className:"EditBtn",
                            }}
                            view = {{
                                store : store
                            }}
                            atOpen = {{
                                animate: 'fadeIn 0.3s forwards'
                            }}
                            atClose = {{
                                animate: 'slide-out-right 0.5s forwards',
                            }}
                        />
                   </div>;
        
    });
    return <Backdrop close={props.close} >
                <div {...props.switchAction} className="SelectPanel">
                    <div  className="StoresList">
                        {storeList}
                        <div className="StoreItem">
                            <PanelSwitch
                                button={{
                                    name : '+',
                                    className:"SelectBtn",
                                }}
                                view = {{
                                    create : true
                                }}
                                atOpen = {{
                                    animate: 'fadeIn 0.3s forwards'
                                }}
                                atClose = {{
                                    animate: 'slide-out-right 0.5s forwards',
                                }}
                        />
                        </div>
                    </div>
                </div>
                   
            </Backdrop> 
    }

