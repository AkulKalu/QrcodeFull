import React, {useState} from 'react';
import '../css/SideMenu.css';
import PanelSwitch from './PanelSwitch';
import ProductPanel from './ProductPanel';
import Button from './Button';


export default function SideMenu(props) {
    const [activeBtn, setActiveBtn] = useState(["SMbutton SMActive", "SMbutton"]);
 
    const buttonClick = (ind) => {
        setActiveBtn(activeBtn.map( (val, i)=> i === ind ?  "SMbutton SMActive":  "SMbutton" ));
        // closure();
    }
   
    return <div className="SMCont">
                <Button 
                    name="Products"
                    onClick ={ () => buttonClick(0) } 
                    className={activeBtn[0]}
                />

                {activeBtn[0].includes('Active') ?
                <PanelSwitch panel={ProductPanel} panelProps={{
                    activeStore : props.activeStore,
                    create: true
                }}>
                     <span  className="SMOption">new</span>
                </PanelSwitch> : null }

                <Button 
                    name="Transactions"
                    onClick ={ () => buttonClick(1) } 
                    className={activeBtn[1]}
                />
                
            </div>
}