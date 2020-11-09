import React, {useState} from 'react';
import '../css/TableHeader.css';


export default function TableHeader(props) {
    const sortDirectons = {
        'id':  false,
        'name': true,
        'manufacturer': true,
        'price': true,
        'active': true,
    }

    const [ascending , setAscending ] = useState({...sortDirectons});

    const sortBy = rule => {
        let sortFun = undefined;

        if(['id','price', 'active'].includes(rule)) {
           if(ascending[rule]) {
                sortFun = (a, b) => a[rule] - b[rule]
           }else {
                sortFun = (a, b) => b[rule] - a[rule] 
           }
           
        }else {
            if(ascending[rule]) {
                sortFun = (a, b) => a[rule].localeCompare(b[rule]); 
            }else {
                sortFun = (a, b) => b[rule].localeCompare(a[rule]);
            }
        }
        setAscending({...sortDirectons, [rule] : !ascending[rule] });
        
        props.sortProducts(sortFun);
    }
    return <div className="TBHCont">
                <div onClick={()=> sortBy('id')} style={{width: '10%'}} className="TBHCell">Id</div>
                <div style={{width: '20%'}} className="TBHCell">Image</div>
                <div onClick={()=> sortBy('name')} style={{width: '20%'}} className="TBHCell">Name</div>
                <div onClick={()=> sortBy('manufacturer')} style={{width: '20%'}} className="TBHCell">Manufacturer</div>
                <div onClick={()=> sortBy('price')} style={{width: '10%'}} className="TBHCell">Price</div>
                <div onClick={()=> sortBy('active')} style={{width: '10%'}} className="TBHCell">Active</div>
                <div style={{width: '10%'}} className="TBHCell">QrCode</div>
            </div>
}

