import React from 'react';
import Store from '../Store/Store';
import AsideToggle from './Aside/AsideToggle';
import Table from '../Table/Table';
import SearchBar from '../SearchBar/SearchBar';


export default function Main(props) {
    let { fullScreen , toogleAside, table, state, dispatch} = props;
    const  strech = () => fullScreen ? null : { width: '100vw' }
    return <main style={ strech() }>

                {!fullScreen && <AsideToggle toggle={toogleAside} /> }  

                <div className="TopBar">

                    <div className="BarStore">
                        <Store stores={state.stores} />
                    </div>

                    <div className="BarSearch">
                        <SearchBar 
                            table={table} 
                            columns={state.tabelColumns[table]} 
                            search={dispatch.search} 
                        />
                    </div>

                </div>
            
                <div className="TableCont">
                    <Table 
                        display={table}  
                        state={state} 
                    />
                </div>

            </main>
}
