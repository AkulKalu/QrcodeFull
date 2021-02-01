import React from 'react';
import NavArrow from './NavArrow';
import Tracker from './Tracker';
import './scss/Navigator.scss';

export default function Navigator(props) {
    
    return <div className="Navigator">
                <NavArrow left {...props} />
                <NavArrow right {...props} />
                <Tracker {...props} />
        </div>
}