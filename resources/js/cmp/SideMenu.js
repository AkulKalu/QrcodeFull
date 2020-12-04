import React, {useState} from 'react';
import '../css/SideMenu.css';
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
                    onClick ={ () => buttonClick(1,0) } 
                    className={activeBtn[0]}
                />       
                <Button 
                    name="Transactions"
                    onClick ={ () => buttonClick(2,1) } 
                    className={activeBtn[1]}
                />  
            </div>
}

