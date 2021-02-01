import React  from 'react';
import Cell from '../Table/Cell';



export default function ColorPick(props) {
    let {data} = props;
    
    const downloadSVG = (e,svgString, name) => {
        e.stopPropagation();
        const url = window.URL.createObjectURL(new Blob([svgString]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}.svg`); 
        link.click();
    }

    return <Cell data-escape  style = {{cursor: 'unset'}}>
                <div 
                    onClick={(e) => downloadSVG(e, data.qrcode, data.model)}  
                    className="QrImg" 
                    data-escape 
                    dangerouslySetInnerHTML={{__html : data.qrcode }}>
                </div> 
        </Cell>
}




