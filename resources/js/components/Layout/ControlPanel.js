import React, {useEffect, useState, Fragment, useContext} from 'react';
import Logo from '../Visual/logo';
import Store from '../Store/Store';
import User from './User';
import LoadScreen from '../Visual/LoadScreen';
import SideMenu from './SideMenu';
import Table from '../Table/Table';
import SearchBar from './SearchBar';
import AsideToggle from './AsideToggle';
import './scss/ControlPanel.scss';
import ReactDOM from 'react-dom';
import {store, StateProvider} from '../HOC/StateProvider';

function ControlPanel() {
     const [loading, setLoading] = useState(true);
     const [showAside, setAside] = useState(true);
     const [table, setTable] = useState('Products');
     const {state, dispatch} = useContext(store);

    useEffect(()=> {
        dispatch.user.login()
    },[])

  
    const switchTable = table => {
        dispatch.search({value:'', filters: null});
        setTable(table);
    }
    const sessionInfo = {
        skipLoad : () => Boolean(sessionStorage.getItem('QrNoLoadScreen')),
    }
  
 
    
    return <Fragment  >
                {( loading && !sessionInfo.skipLoad()) &&  <LoadScreen panelLoaded={()=> setLoading(false)} user={state.user} />  }
                {state.user.info ? 
                <div className="CPanel">
                   <aside style={showAside ? null : {width: 0, overflow: 'hidden'}}>
                        {showAside && <AsideToggle toggle={()=>setAside(!showAside)} />}
                        <div className="LogoWrap">
                            {(sessionInfo.skipLoad()) && <Logo type="LogoPanel"/>  }
                        </div>
                        <div className="User">
                            <User />
                        </div>
                        <div className="Menu">
                            <SideMenu 
                                switchTable = {switchTable}
                                stats = {{[table] : state.stats[table]}}
                            />
                        </div>
            
                    </aside> 
                   
                    <main style={ showAside ? null : {width: '100vw'} }>
                        {!showAside && <AsideToggle toggle={()=>setAside(!showAside)} /> }  
                        <div className="TopBar">
                            <div className="BarStore">
                                <Store stores={state.stores} />
                            </div>
                            <div className="BarSearch">
                                <SearchBar table={table} columns={state.tabelColumns[table]} search={dispatch.search} />
                            </div>
                        </div>
                      
                        <div className="TableCont">
                            <Table display={table}  state={state} />
                        </div>
                    </main>
                </div>: null
                }
            </Fragment>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<StateProvider> <ControlPanel /> </StateProvider>, document.getElementById('ControlPanel'));
}
