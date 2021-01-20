import React  from 'react';
import { SketchPicker } from 'react-color';
// import './scss/ProductPreview.scss';



export default function ColorPick({name, color, setThemeColor ,activatePicker, active}) {

    return <div  className="ColorWrap">
                 <div onClick={activatePicker} style={{background : color.rgbStr}} className="Color">

                </div>
                {active ? <div className="ColorPicker"><SketchPicker color={color.rgb} onChangeComplete={ setThemeColor } /></div>  : null}
            </div>
}




