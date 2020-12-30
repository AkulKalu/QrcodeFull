import React, {useState} from 'react';
import './scss/StoreSelect.scss';

export default function SelectPanel(props) {
    const [animation, animate] = useState({animation: 'fadeIn 0.1s forwards', onEnd: null});
    const close = (store = false) => {
       let animation = {
            animation: 'fadeOut 0.2s forwards', 
            onEnd: store ? () =>{ 
                props.closePanel();
                props.stores.switch(store)
            } : props.closePanel
        }
       
       animate(animation);
    }
    const backdropCtrl = e => {
        if(e.target.id === 'backdrop') close();
    }
    const storeList = props.stores.list.map((store, i) => {
        return <div  key={`storeLI${i}`} className="StoreItem"> 
                        <div className="SelectBtn" onClick={() => close(store)}  
                        >{store.name}</div>
                        <div onClick={() =>props.setMode({action:'edit', object:store})} className="EditBtn">ED</div>
                   </div>;
        
    });
    return <div onClick={backdropCtrl} id="backdrop" className="BackdropS">
        <div style={animation} onAnimationEnd={animation.onEnd} className="SelectPanel">
        <div  className="StoresList">
            {storeList}
            <div className="StoreItem">
                <div className="SelectBtn" onClick={() => props.setMode({action: 'create'})} >+</div>
            </div>
        </div>
    </div>
    </div>;
}

