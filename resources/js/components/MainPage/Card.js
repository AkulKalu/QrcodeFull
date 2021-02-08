import React from 'react';
import './scss/Card.scss';




export default function Card(props) {
    let {cardNumber} = props;
    let textContent = null;
    let images = null;
    // <a href="https://ibb.co/M2gmXKV"><img src="https://i.ibb.co/0Dnxw1M/qrcode-5.jpg" alt="qrcode-5" border="0"></a>
    // <a href="https://ibb.co/44tg8LX"><img src="https://i.ibb.co/5s4xr3S/qrcode-3.jpg" alt="qrcode-3" border="0"></a>
    // <a href="https://ibb.co/bXDcMdV"><img src="https://i.ibb.co/KWSTpyg/qrcode-4.jpg" alt="qrcode-4" border="0"></a>
    // <a href="https://ibb.co/xf6vm2v"><img src="https://i.ibb.co/mX4svRs/qrcode-2.jpg" alt="qrcode-2" border="0"></a>
    // <a href="https://ibb.co/8zYQ8cK"><img src="https://i.ibb.co/SQfZvrs/qrcode-1.jpg" alt="qrcode-1" border="0"></a>
    switch (cardNumber) {
        case '1':
            textContent = <div>
                <h2>Alow your customers to pay for your merchandise withe their phone, with a simple QrCode scan</h2>
                <p>Manage your items, generate QrCodes, use our premade customizable checkup and automaticaly email purchase and shipping notifications.</p>
                <h2>Step 1:</h2>
                <p>Simply, create a store and add your contact and api keys.</p>
            </div>
            images = ['https://i.ibb.co/5s4xr3S/qrcode-3.jpg'
        ]
            break;
        case '2':
            images = ['https://i.ibb.co/SQfZvrs/qrcode-1.jpg',]
            break;
        
        default:
            images = ['https://i.ibb.co/SQfZvrs/qrcode-1.jpg',]
            break;
    }

    images = images.map( (link, i) => <img key={`img${i}`} src={link} alt={`img${i}`} />)
   
    return <div className= "Card">
               <div className="Text">
                    {textContent}
               </div>
               <div className="Images">
                    {images}
               </div>
            </div>
}

