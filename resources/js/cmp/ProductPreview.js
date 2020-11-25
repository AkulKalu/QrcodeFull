import React from 'react';
import '../css/ProductPreview.css';

export default function ProductPreview(props) {
    let colors = Object.keys(props.colorPallete).map( (col, i) => {
        return  <div  key={`colPick${i}`} className="ColorPickWrap">
                    <div style={{background: props.colorPallete[col]}} className="ColorPick"></div>
                </div>
    } )
    return <div className="PreviewContainer">
                <div className="PreviewColors">
                    {colors}
                </div>
                <div className="PreviewImg" >
                    <img src={props.product.image_url} alt="ProductImage"></img>
                </div>
                <div>
                    <span className="PreviewName">{props.product.category}</span>
                    <span className="PreviewBrand">{props.product.manufacturer}</span>
                    <span className="PreviewModel"> {props.product.model} </span>
                    <span className="PreviewPrice"> ${props.product.price} </span>
                </div>
                <div className="PreviewBtn PreviewAbout">
                    <span>About</span>
                </div>
                <div className="PreviewBtn PreviewBuy">
                    <span>Buy</span>
                </div>
        </div>
      
}