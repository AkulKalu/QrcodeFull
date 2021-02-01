import React, {useContext} from 'react';
import './scss/SelectPanel.scss';
import {store} from '../HOC/StateProvider';
import StorePanel from './StorePanel';
import EditBtn from './EditBtn';
import Backdrop from '../Shared/Backdrop';
import AsSwitch from '../HOC/AsSwitch';
import Button from '../InputElements/Button';
import WithValidator from '../HOC/WithValidator';


let EditPanelSwitch = AsSwitch(WithValidator(StorePanel), EditBtn);
let CreatePanelSwitch = AsSwitch(WithValidator(StorePanel));

export default function SelectPanel(props) {
    let {switchAction, close} = props;
    const {state, dispatch} = useContext(store);

    const switchStore = (store = false) => {
        dispatch.stores.switch(store);
        close()
    }
  
    const storeList = state.stores.all.map((store, i) => {
        return <div  key={`storeLI${i}`} className="StoreItem"> 
                        <Button className="Orange SelectBtn"  name={store.name} onClick={() => switchStore(store)} />
                        <EditPanelSwitch
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
    return <Backdrop close={close} >
                <div {...switchAction} className="SelectPanel">
                    <div  className="StoresList">
                        {storeList}
                        <div className="StoreItem">
                            <CreatePanelSwitch
                                button={{
                                    name : '+',
                                    className: "Orange SelectBtn",
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

