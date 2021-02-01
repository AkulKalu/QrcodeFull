import React  from 'react';
import { SketchPicker } from 'react-color';



export default function ColorPick(props) {
    let {color, setThemeColor ,activatePicker, active} = props;
    return <div  className="ColorWrap">
                 <div onClick={activatePicker} style={{background : color.rgbStr}} className="Color">

                </div>
                {active ? <div className="ColorPicker"><SketchPicker color={color.rgb} onChangeComplete={ setThemeColor } /></div>  : null}
            </div>
}




