import React  from 'react';
import Logo from '../../Visual/logo';
import SideMenu from './SideMenu';
import Store from '../../Store/Store'
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

                <div className="StoresWrap">
                    <Store />
                </div>
                <div className="Menu">
                    <SideMenu 
                        switchTable = {switchTable}
                        stats = {stats}
                    />
                </div>
    
            </aside> 
               
    
}


