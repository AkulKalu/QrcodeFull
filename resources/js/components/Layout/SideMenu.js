import React, {useState, Fragment} from 'react';
import './scss/SideMenu.scss';
import Button from '../InputElements/Button';
import Stats from '../Table/Stats';



export default function SideMenu(props) {
    const [activeBtn, setActiveBtn] = useState(["SMbutton SMActive", "SMbutton", "SMbutton"]);
 
    const buttonClick = (table,ind) => {
        setActiveBtn(activeBtn.map( (val, i)=> i === ind ?  "SMbutton SMActive":  "SMbutton" ));
        props.switchTable(table);
    }
    let btns = ['Products', 'Transactions', 'Shippments'].map( (name, i) => {
        let btn = <Button key={`SmBtn${i}`} className={activeBtn[i]} name={name} onClick={ () => buttonClick(i+1, i) }  />
       
        return props.stats[i+1] ? 
        <Fragment key={`SmBtn${i}`}>
            {btn}
            <div className="StatsDisplay" ><Stats show={props.stats[i + 1]}/></div>   
        </Fragment> : btn
    } )
    return <div >
                {btns}
            </div>
}

