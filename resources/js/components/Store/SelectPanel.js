import React, {useState, useContext} from 'react';
import './scss/StoreSelect.scss';
import {store} from '../HOC/StateProvider';

export default function SelectPanel(props) {
    const [animation, animate] = useState({animation: 'fadeIn 0.1s forwards', onEnd: null});
    const {state, dispatch} = useContext(store);
 
    const switchStore = (store = false) => {
       animate({
            animation: 'fadeOut 0.2s forwards', 
            onEnd:  () => { 
                props.closePanel();
                dispatch.stores.switch(store)
            } 
        });
    }
    const backdropClose = e => {
        if(e.target.id === 'backdrop') {
            animate({
                animation: 'fadeOut 0.2s forwards', 
                onEnd: props.closePanel
            });
        }
    }
  
    const storeList = state.stores.list.map((store, i) => {
        store.idx = i;
        return <div  key={`storeLI${i}`} className="StoreItem"> 
                        <div className="SelectBtn" onClick={() => switchStore(store)}  
                        >{store.name}</div>
                        <div onClick={() =>props.setMode({action:'edit', object:store})} className="EditBtn">ED</div>
                   </div>;
        
    });
    return <div 
                onClick={backdropClose} 
                id="backdrop" 
                className="BackdropS">
                <div 
                    style={animation} 
                    onAnimationEnd={animation.onEnd} 
                    className="SelectPanel">
                    <div  className="StoresList">
                        {storeList}
                        <div className="StoreItem">
                            <div 
                                className="SelectBtn" 
                                onClick={() => props.setMode({action: 'create'})} >
                                    +
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
    }

