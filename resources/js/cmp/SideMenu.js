import React, {useState} from 'react';
import '../css/SideMenu.css';
import Backdrop from './Backdrop';
import ProductPanel from './ProductPanel';

export default function SideMenu(props) {
    const [activeBtn, setActiveBtn] = useState('ProdBtn');
    const [productPanelOpen, openProductPanel] = useState(false);
    const buttonClick = (ev, closure) => {
        setActiveBtn(ev.target.id);
        // closure();
    }
    const setClass = id => activeBtn === id ? "SMbutton SMActive" : "SMbutton";

    return <div className="SMCont">
                <button 
                    onClick ={ e => buttonClick(e) } 
                    id="ProdBtn" 
                    className={setClass("ProdBtn")}
                    type="button">
                    Products
                </button>
                {activeBtn === 'ProdBtn' ? <span onClick={() => openProductPanel(true)} className="SMOption">new</span> : null }
                <button 
                    onClick ={ e => buttonClick(e) } 
                    id="TranBtn" 
                    className={setClass("TranBtn")} 
                    type="button">
                    Transactions
                </button>
                {productPanelOpen ? 
                    <Backdrop>
                        <ProductPanel
                            closePanel={() => openProductPanel(false)}
                            activeStore={props.activeStore}
                            create
                         />
                    </Backdrop> : null
                }
            </div>
}