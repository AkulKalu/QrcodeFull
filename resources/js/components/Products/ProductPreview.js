import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
import './scss/ProductPreview.scss';

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
        return  <div  key={`colPick${i}`} className="ColorWrap">
                    <div onClick={()=> activatePicker(i)} style={{background: props.colorPallete[segment].rgbStr}} className="Color">
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

    return <div className="Checkout">
            <h3>Checkout</h3>
            <div style={styles.container} className="Preview">
                    <div className="Cam">
                        <div></div>
                    </div>
                    <div className="Colors">
                        {colorPickers}
                    </div>
                    <div style={styles.image} className="Img" >
                        {props.product.image_url.length ?  
                        <img src={props.product.image_url} alt="ProductImage"></img> : 
                        <div>IMAGE</div>
                        }
                    </div>
                    <div>
                        <span className="InfoSmall">{props.product.category}</span>
                        <span className="InfoLarge">{props.product.manufacturer}</span>
                        <span className="InfoSmall"> {props.product.model} </span>
                        <span className="InfoLarge"> ${props.product.price} </span>
                    </div>
                    <div className="Buttons">
                        <div style={styles.button} className="Btn PreviewAbout">
                            <span>About</span>
                        </div>
                        <div style={styles.button} className="Btn Buy">
                            <span>Buy</span>
                        </div>
                    </div>
            </div>
        </div>
      
}