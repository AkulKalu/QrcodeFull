import React, {useEffect, useState, Fragment, useContext} from 'react';
import Logo from '../Visual/logo';
import Store from '../Store/Store';
import User from './User';
import LoadScreen from '../Visual/LoadScreen';
import SideMenu from './SideMenu';
import Products, {AddProduct} from '../Products/Products';
import Transactions from '../Transactions/Transactions';
import Shippments from '../Shippments/Shippments';
import Table from '../Table/Table';
import SearchBar from './SearchBar';
import './scss/ControlPanel.scss';
import ReactDOM from 'react-dom';
import {store, StateProvider} from '../HOC/StateProvider';

function ControlPanel() {
     const [loading, setLoading] = useState(false);
     const [table, setTable] = useState('Products');
     const {state, dispatch} = useContext(store);

    useEffect(()=> {
        dispatch.user.login()
    },[])

    
    
    const tables = {
        Transactions : {
            Component: Transactions,
            data: state.user.transactions,
            columns: state.tabelColumns.Transactions,
            stats: state.user.transactions.stats,
            controls: []
            
        },
        Products: {
            Component: Products,
            data: state.products,
            columns: state.tabelColumns.Products,
            stats: state.products.stats,
            controls: [AddProduct]
        },
        Shippments: {
            Component: Shippments,
            data: state.user.shippments,
            columns: state.tabelColumns.Shippments,
            stats: state.user.shippments.stats,
            controls: []
        },
    }
   
    const switchTable = table => {
        dispatch.search({value:'', filters: null});
        setTable(table);
    }
 
    return <Fragment  >
                {loading ?  <LoadScreen panelLoaded={()=> setLoading(false)} user={state.user} /> : null }
                {state.user.info ? 
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
                                stats = {{[table] : tables[table].stats}}
                            />
                        </div>
            
                    </aside>
                    <main>
                        <div className="TopBar">
                            <div className="BarStore">
                                <Store stores={state.stores} />
                            </div>
                            <div className="BarSearch">
                                <SearchBar table={table} columns={state.tabelColumns[table]} search={dispatch.search} />
                            </div>
                        </div>
                      
                        <div className="TableCont">
                            <Table display={tables[table]} search={state.search} />
                        </div>
                    </main>
                </div>: null
                }
            </Fragment>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<StateProvider> <ControlPanel /> </StateProvider>, document.getElementById('ControlPanel'));
}
