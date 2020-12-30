import React from 'react';
import PanelSwitch from '../HOC/PanelSwitch';
import StoreSelect from './StoreSelect';
import Button from '../InputElements/Button';
import {getStores} from '../../Functions/server';
import './scss/Store.scss';




export default function Store(props) {

    
    return <div className="Store">
                <span>Store:</span>
                <PanelSwitch 
                    panel={StoreSelect} 
                    panelProps={
                        { 
                            stores : props.stores
                        }
                    } 
                    element= {Button}
                    elementProps= {
                        {
                            name:props.stores.active.name,
                            className:"StoreBtn"
                        }
                    }>
                </PanelSwitch>
          </div>
}

