import React  from 'react';
import Logo from '../../Visual/logo';
import User from './User';
import SideMenu from './SideMenu';
import AsideToggle from './AsideToggle';



export default function Aside(props) {
    let {show , stats,switchTable, showLogo, toogleAside} = props;

    const hide = () => {
        return show ? null : {
            width: 0, 
            overflow: 'hidden'
        }
    }
    
    return  <aside style={ hide() }>

                {show && <AsideToggle toggle={toogleAside} />}

                <div className="LogoWrap">
                    { showLogo && <Logo type="LogoPanel"/> }
                </div>

                <div className="User">
                    <User />
                </div>

                <div className="Menu">
                    <SideMenu 
                        switchTable = {switchTable}
                        stats = {stats}
                    />
                </div>
    
            </aside> 
               
    
}


