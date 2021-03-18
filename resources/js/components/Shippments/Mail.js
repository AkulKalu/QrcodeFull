import React, {useContext}  from 'react';
import {store} from '../HOC/StateProvider';
import './scss/Mail.scss';

export default function Mail(props) {
    let { shippmentId } = props;
    const {dispatch} = useContext(store);
    const markAsSent = e => {
        e.stopPropagation();
        dispatch.user.setShippingStatus(shippmentId);
    } 
    return  <div className="MailWrap" onClick={markAsSent}>
        <svg   version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 512 512" className="Mail" xmlSpace="preserve">
    <g>
        <g>
            <path d="M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121
                C512,114.073,510.297,107.588,507.49,101.721z"/>
        </g>
    </g>
    <g>
        <g>
            <path d="M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51
                C480.412,77.703,473.927,76,467,76z"/>
        </g>
    </g>
    <g>
        <g>
            <path d="M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z"/>
        </g>
    </g>
    <g>
        <g>
            <path d="M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49
                C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z"/>
        </g>
    </g>
   
    </svg>
    </div> 
    
}