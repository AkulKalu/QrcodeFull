import React, {useEffect, useState, Fragment, useContext} from 'react';
import Logo from '../Visual/logo';
import Store from '../Store/Store';
import User from './User';
import LoadScreen from '../Visual/LoadScreen';
import SideMenu from './SideMenu';
import Products from '../Products/Products';
import Transactions from '../Transactions/Transactions';
import Shippments from '../Shippments/Shippments';
import SearchBar from './SearchBar';
import './scss/ControlPanel.scss';
import ReactDOM from 'react-dom';
import {store, StateProvider} from '../HOC/StateProvider';

function ControlPanel() {
     const [loading, setLoading] = useState(false);
     const [table, setTable] = useState(1);
     const [filter, setFilter] = useState(null);
     
     const {state, dispatch} = useContext(store);

    useEffect(()=> {
        dispatch.user.login()
    },[])

    let stats = {
        1 : {
            total: {
                value: 10,
            },
            active: {
                value: 1,
            },
            categories: {
                value: 1,
            }
        },
        2 : {
            today: {
                value: 1,
                color: 'green',
            },
            income: {
                value: '10$',
                color: 'green',
            },
            total: {
                value: 1,
                color: 'green',
            }
        },
        3 : {
            pending: {
                value: 5,
                color: 'green'
            } ,
            sent: {
                value: 5,
                color: 'green'
            }
            
        }
    }
   
   
    const switchTable = table => {
        setFilter(null);
        setTable(table);
    }

    const displayTable = () => {
        switch (table) {
            case 2:
                return <Transactions
                            filter = {filter}
                            list = {state.user.transactions.list}
                            tabelColumns = {state.tabelColumns[2]}
                       />
            case 3:
                return <Shippments
                            filter = {filter}
                            list = {state.user.shippments.list}
                            tabelColumns = {state.tabelColumns[3]}
                        />
            default:
                return <Products
                            filter = {filter}
                            list = {state.products.list}
                            tabelColumns = {state.tabelColumns[1]}
                       />
        }
    }
    

    return <Fragment  >
                {loading ?  <LoadScreen panelLoaded={()=> setLoading(false)} user={state.user} /> : null }
                {state.user ? 
                <div className="CPanel">
                    <aside>
                        <div className="Logo">
                            {!loading ? <Logo type="LogoPanel"/> : null }
                        </div>
                        <div className="User">
                            <User />
                        </div>
                        <div className="Menu">
                            <SideMenu 
                                switchTable = {switchTable}
                                stats = {{[table] : stats[table]}}
                            />
                        </div>
            
                    </aside>
                    <main>
                        <div className="TopBar">
                            <div className="BarStore">
                                <Store stores={state.stores} />
                            </div>
                            <div className="BarSearch">
                                <SearchBar table={table} columns={state.tabelColumns[table]} setFilter={setFilter}  />
                            </div>
                        </div>
                      
                        <div className="TableCont">
                            {displayTable()}
                        </div>
                    </main>
                </div>: null
                }
            </Fragment>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<StateProvider> <ControlPanel /> </StateProvider>, document.getElementById('ControlPanel'));
}
