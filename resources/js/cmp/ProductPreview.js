import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
import '../css/ProductPreview.css';

export default function ProductPreview(props) {
    const [colorPicker, setColorPicker] = useState(false);

    const activatePicker = ind => {
        colorPicker === ind ? setColorPicker(false) : setColorPicker(ind);
    }
    const colorPalleteOnChange = (segment, col) =>{ 
        const rgbString = color => `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        props.setColorPallete({...props.colorPallete, [segment]: {rgbStr: rgbString(col.rgb), rgb:col.rgb}})
    };
    
   
    let colorPickers = Object.keys(props.colorPallete).map( (segment, i) => {
        return  <div  key={`colPick${i}`} className="ColorPickWrap">
                    <div onClick={()=> activatePicker(i)} style={{background: props.colorPallete[segment].rgbStr}} className="ColorPick">
                    </div>
                    {colorPicker === i ? <div className="ColorPicker"><SketchPicker color={props.colorPallete[segment].rgb} onChangeComplete={ col => colorPalleteOnChange(segment, col) } /></div>  : null}
                </div>
    } )

    let styles = {
        container: {
            background: props.colorPallete.background.rgbStr,
            color: props.colorPallete.font.rgbStr,
        },
        image: {
            background: props.colorPallete.image.rgbStr,
        },
        button: {
            background: props.colorPallete.buttons.rgbStr,
            color: props.colorPallete.background.rgbStr,
        }
    }
    return <div style={styles.container} className="PreviewContainer">
                <div className="PreviewColors">
                    {colorPickers}
                </div>
                <div style={styles.image} className="PreviewImg" >
                    <img src={props.product.image_url} alt="ProductImage"></img>
                </div>
                <div>
                    <span className="PreviewName">{props.product.category}</span>
                    <span className="PreviewBrand">{props.product.manufacturer}</span>
                    <span className="PreviewModel"> {props.product.model} </span>
                    <span className="PreviewPrice"> ${props.product.price} </span>
                </div>
                <div style={styles.button} className="PreviewBtn PreviewAbout">
                   About
                </div>
                <div style={styles.button} className="PreviewBtn PreviewBuy">
                    Buy
                </div>
        </div>
      
}