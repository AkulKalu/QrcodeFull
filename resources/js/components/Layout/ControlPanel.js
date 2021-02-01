import React, {useEffect, useState, Fragment, useContext} from 'react';
import LoadScreen from './LoadScreen';
import Aside from './Aside/Aside';
import Main from './Main';
import {store, StateProvider} from '../HOC/StateProvider';
import './scss/ControlPanel.scss';
import ReactDOM from 'react-dom';


function ControlPanel() {
     const [loading, setLoading] = useState(true);
     const [table, setTable] = useState('Products');
     const [showAside, setAside] = useState(true);
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
                        <Aside
                            show = {showAside}
                            toogleAside = {()=>setAside(false)}
                            switchTable = { switchTable }
                            showLogo = { sessionInfo.skipLoad() }
                            stats = {{[table] : state.stats[table]}}
                        />
                        <Main 
                            fullScreen = {showAside}
                            toogleAside = {()=>{
                                setAside(true)}}
                            state = { state }
                            dispatch = { dispatch }
                            table = { table }
                        />
                    </div>  : null
                }
            </Fragment>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<StateProvider> <ControlPanel /> </StateProvider>, document.getElementById('ControlPanel'));
}
