import React, {useState, Fragment} from 'react';
import ProductPanel from '../../Products/ProductPanel'
import AsSwitch from '../../HOC/AsSwitch'
import AsideBtn from './AsideBtn';
import Stats from './Stats';
import './scss/SideMenu.scss';

let AddProductSwitch = AsSwitch(ProductPanel, AsideBtn);

export default function SideMenu(props) {
    const {stats, switchTable} = props;
    
    const [activeBtn, setActiveBtn] = useState(["SideBtnActive ", "SideBtn", "SideBtn"]);
 
    const buttonClick = (table,ind) => {
        setActiveBtn(activeBtn.map( (val, i)=> i === ind ?  "SideBtnActive":  "SideBtn" ));
        switchTable(table);
    }

    let btns = ['Products', 'Transactions', 'Shippments'].map( (name, i) => {
        let btn =  <AsideBtn  
                        key={`SmBtn${i}`} 
                        className={activeBtn[i]}
                        title = {name.toUpperCase()}
                        onClick={ () => buttonClick(name, i) }
                     />
                   
        return stats[name] ? 
        <Fragment key={`SmBtn${i}`}>
            {btn}
            {name =='Products' && <AddProductSwitch 
                                    view = {{
                                        add:true
                                    }}
                                    button = {{
                                        className: "SideBtn SideBtnSub",
                                        title: 'ADD'
                                        }
                                    }
                                    atOpen = {{
                                        animate: 'fadeIn 0.3s forwards'
                                    }}
                                    atClose = {{
                                        animate: 'fadeOut 0.3s forwards',
                                    }}
                                 />}
            <div className="StatsDisplay" ><Stats show={stats[name]}/></div>   
        </Fragment> : btn
    } )
    return <div >
                {btns}
            </div>
}

