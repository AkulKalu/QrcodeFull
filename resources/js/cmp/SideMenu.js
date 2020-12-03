import React, {useState} from 'react';
import '../css/SideMenu.css';
import PanelSwitch from './PanelSwitch';
import ProductPanel from './ProductPanel';
import Button from './Button';


export default function SideMenu(props) {
    const [activeBtn, setActiveBtn] = useState(["SMbutton SMActive", "SMbutton"]);
 
    const buttonClick = (table,ind) => {
        setActiveBtn(activeBtn.map( (val, i)=> i === ind ?  "SMbutton SMActive":  "SMbutton" ));
        props.switchTable(table);
    }
    
    return <div className="SMCont">
                <Button 
                    name="Products"
                    onClick ={ () => buttonClick('products',0) } 
                    className={activeBtn[0]}
                />
                {activeBtn[0].includes('Active') ?
                     <span onClick={()=>{
                         console.log('x');
                        props.setNewProduct(true)
                     } }  className="SMOption">new</span>
                : null }
               
                <Button 
                    name="Transactions"
                    onClick ={ () => buttonClick('transactions',1) } 
                    className={activeBtn[1]}
                />
                
            </div>
}

