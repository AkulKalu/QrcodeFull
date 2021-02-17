import React, {useState} from 'react';
import ColorPick from './ColorPick';
import './scss/ProductPreview.scss';



export default function ProductPreview(props) {
    let { colorPallete, setColorPallete, product } = props;

    const [colorPicker, setColorPicker] = useState(false);
    const activatePicker = ind => {
        colorPicker === ind ? setColorPicker(false) : setColorPicker(ind);
    }

    const colorPalleteOnChange = (segment, col) =>{ 
        setColorPallete({
            ...colorPallete, 
            [segment]: {rgbStr: themeCoder.rgbString(col.rgb), rgb:col.rgb}
        })
    };
    
   
    let colorPickers = Object.keys(colorPallete).map( (segment, i) => {
      
        return  <ColorPick 
                    key={`cpick${i}`}
                    name = {segment}
                    active={colorPicker === i} 
                    color={colorPallete[segment]} 
                    activatePicker = {()=> activatePicker(i)} 
                    setThemeColor = { col => colorPalleteOnChange(segment, col) } />
    } )

    let styles = {
        container: {
            background: colorPallete.background.rgbStr,
            color: colorPallete.font.rgbStr,
        },
        image: {
            background: colorPallete.image.rgbStr,
        },
        button: {
            borderColor: colorPallete.buttons.rgbStr,
            color: colorPallete.buttons.rgbStr,
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
                        {product.image_url.length  ?  
                        <img src={product.image_url} alt="ProductImage"></img> : 
                        <div>IMAGE</div>
                        }
                    </div>
                    <div className="Main">
                        <div className="Info">
                            <div className="InfoLarge">{product.manufacturer}</div>
                            <div className="InfoSmall">
                                <span >{product.category}</span>
                                <span className="border-left"> {product.model} </span>
                            </div>
                            
                            <div className="Price">  ${product.price} </div>
                        </div>
                        <div className="Buttons">
                            <div style={styles.button} className="Btn About">
                                <span>Info</span>
                            </div>
                            <div style={styles.button} className="Btn Buy">
                                <span>Buy</span>
                            </div>
                        </div>
                    </div>
                    </div>    
            </div>
        
}
export const themeCoder = {
    fromCode : ( code ) => {
        let theme = code.split('&').map( (segment, i) => {
            let [key, rgbStr] = segment.split('|')
            let [r, g, b, a] = [...rgbStr.matchAll('[0-9\.]{1,}')].map( val => Number(val[0]));

            return [key, {
                    rgbStr: rgbStr,
                    rgb: {
                        r:r,
                        g:g,
                        b:b,
                        a:a,
                    }
                }]
        } )
        return Object.fromEntries(theme)
    },
    encode :  theme => {
        return Object.keys(theme).map(key => {
            return `${key}|${theme[key].rgbStr}`
        }).join('&')
    },
    rgbString : ({r, g, b, a,}) => `rgb(${r}, ${g}, ${b}, ${a})`,
}



