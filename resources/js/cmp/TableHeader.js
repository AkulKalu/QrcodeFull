import React from 'react';
import '../css/TableHeader.css';


export default function TableHeader(props) {

    return <div className="TBHCont">
                <div style={{width: '10%'}} className="TBHCell">Id</div>
                <div style={{width: '20%'}} className="TBHCell">Image</div>
                <div style={{width: '20%'}} className="TBHCell">Name</div>
                <div style={{width: '20%'}} className="TBHCell">Manufacturer</div>
                <div style={{width: '10%'}} className="TBHCell">Price</div>
                <div style={{width: '10%'}} className="TBHCell">Active</div>
                <div style={{width: '10%'}} className="TBHCell">QrCode</div>
            </div>
}