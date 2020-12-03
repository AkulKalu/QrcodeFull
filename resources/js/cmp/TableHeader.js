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
        
        props.sort(sortFun);
    }

    let columns = props.columns.map( (col, i) => {
        return  <div 
                    key={`TBC${i}`}
                    onClick={ col.sort ? ()=> sortBy(col.name) : null} 
                    style={{width: col.width}} 
                    className="TBHCell">
                    {col.name}
                </div>
    } )
    return <div className="TBHCont">
                <div style={{width: '20%'}} className="TBHCell">Image</div>
                <div 
                    onClick={()=> sortBy('category')} 
                    style={{width: '10%'}} 
                    className="TBHCell">
                    Category
                </div>
                <div 
                    onClick={()=> sortBy('model')} 
                    style={{width: '20%'}} 
                    className="TBHCell">
                    Model
                  
                </div>
                <div 
                    onClick={()=> sortBy('manufacturer')} 
                    style={{width: '20%'}} 
                    className="TBHCell">
                    Manufacturer
                    
                </div>
                <div 
                    onClick={()=> sortBy('price')} 
                    style={{width: '10%'}} 
                    className="TBHCell">
                    Price
                   
                </div>
                <div onClick={()=> sortBy('active')} style={{width: '10%'}} className="TBHCell">Active</div>
                <div style={{width: '10%'}} className="TBHCell">QrCode</div>
            </div>
}

