import React, {useEffect, useState} from 'react';
import Logo from './logo';
import Store from './Store';
import User from './User';
import SideMenu from './SideMenu';
import Products from './Products';
import Transactions from './Transactions';
import SearchBar from './SearchBar';
import {authenticate} from '../Functions/server';
import '../css/ControlPanel.css';
import ReactDOM from 'react-dom';




 function ControlPanel() {
     const [user, setUser] = useState(null);
     const [activeStore, setActiveStore] = useState(null);
     const [table, switchTable] = useState(1);
     const [filter, setFilter] = useState(null);

    useEffect(()=> {
        authenticate()
        .then(res => {
            setUser(res.data.user);
         })
    },[])

    return <div >
                {user ? 
                <div>
                    <aside>
                        <Logo/>
                        <SideMenu 
                            activeStore = {activeStore} 
                            switchTable = {switchTable}
                        />
                    </aside>
                        <div className="CPBarWrap">
                            <div className="CPBar">
                                <div className="CPBarStore">
                                    <Store 
                                        active={activeStore} 
                                        setActiveStore ={setActiveStore}
                                    />
                                    </div>
                                <div className="CPBarSearch">
                                    <SearchBar setFilter={setFilter}  />
                                </div>
                                <div className="CPAccount">
                                    <User user={user} />
                                </div>
                            </div>
                    </div>
                    <div className="CPTableCont">
                        {table === 1 ?
                            <Products
                                activeStore = {activeStore}
                                filter = {filter}
                            />:
                            <Transactions />
                         }
                    </div>
                </div>: null
                }

            </div>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<ControlPanel />, document.getElementById('ControlPanel'));
}
