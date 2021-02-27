import React, {useState, Fragment} from 'react';
import AddProduct from '../../Products/AddProduct';
import Stats from './Stats';
import './scss/SideMenu.scss';

export default function SideMenu(props) {
    const {stats, switchTable} = props;
    
    const [activeBtn, setActiveBtn] = useState(["SMActive ", "SMbutton", "SMbutton"]);
 
    const buttonClick = (table,ind) => {
        setActiveBtn(activeBtn.map( (val, i)=> i === ind ?  "SMActive":  "SMbutton" ));
        switchTable(table);
    }

    let btns = ['Products', 'Transactions', 'Shippments'].map( (name, i) => {
        let btn = <div 
                    key={`SmBtn${i}`} 
                    className={activeBtn[i]} 
                    onClick={ () => buttonClick(name, i) }>
                        <div className="BtnContent">
                            <div className="Text">
                            <span>{name.toUpperCase()}</span>
                            </div>
                            
                            <div className="Indicator">
                                <div></div>
                            </div>
                        </div>
                    </div>
        return stats[name] ? 
        <Fragment key={`SmBtn${i}`}>
            {btn}
            {name =='Products' && <AddProduct />}
            <div className="StatsDisplay" ><Stats show={stats[name]}/></div>   
        </Fragment> : btn
    } )
    return <div >
                {btns}
            </div>
}

