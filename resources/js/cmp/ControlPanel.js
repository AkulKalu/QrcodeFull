import React, {useEffect, useState} from 'react';
import Logo from './logo';
import Store from './Store';
import User from './User';
import SideMenu from './SideMenu';
import Products from './Products';
import SearchBar from './SearchBar';
import {authenticate} from '../Functions/server';
import '../css/ControlPanel.css';
import ReactDOM from 'react-dom';




 function ControlPanel() {
     const [user, setUser] = useState(null);
     const [activeStore, setActiveStore] = useState(null);
     const [table, switchTable] = useState(null);
     const [newProduct, setNewProduct] = useState(false);
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
                            setNewProduct = {setNewProduct}
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
                    
                    <Products
                        activeStore = {activeStore}
                        new={newProduct}
                        filter = {filter}
                    />
                </div>: null
                }

            </div>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<ControlPanel />, document.getElementById('ControlPanel'));
}
