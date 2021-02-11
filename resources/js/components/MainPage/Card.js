import React from 'react';
import './scss/Card.scss';




export default function Card(props) {
    let {cardNumber} = props;

    let textContent = null;
    let images = [];
 
    switch (cardNumber) {
        case  1:
            textContent = <div >
                <h3>Alow your customers to pay for your merchandise withe their phone, with a simple QrCode scan</h3>
                <p>Manage your items, generate QrCodes, use our premade customizable checkup and automaticaly email purchase and shipping notifications.</p>
                <h2 className="Underlinie">Step 1</h2>
                <p>Simply, create a store and add your contact and api keys.</p>
            </div>
            images = ['https://i.ibb.co/5s4xr3S/qrcode-3.jpg'
        ]
            break;
        case  2:
            textContent = <div>
            <h2 className="Underlinie">Step 2</h2>
            <p>Add items, and make your own color theme for the checkout page. </p>
        </div>
            images = ['https://i.ibb.co/KWSTpyg/qrcode-4.jpg',]
            break;
        case  3:
            textContent = <div>
            <p>Use our modern control panel to keep track of your items, generate or download codes, and make changes.</p>
            </div>
            images = ['https://i.ibb.co/SQfZvrs/qrcode-1.jpg',]
            break;
        case  4:
            textContent = <div>
            <p>You can also keep track of any transactions and related shippments that need to be sent</p>
            <p>Simply click the envelope button when merch is on the way and the customer will be notified</p>
            </div>
            images = ['https://i.ibb.co/0Dnxw1M/qrcode-5.jpg', 'https://i.ibb.co/mX4svRs/qrcode-2.jpg']
            break;
        
        default:
            textContent = <div>
            <h2 className="Underlinie">Final step</h2>
            <h1>Make money!</h1>
            </div>
            break;
    }

    images = images.map( (link, i) => <img key={`img${i}`} src={link} alt={`img${i}`} />)
   
    return <div className= "Card">
               <div className="Text" >
                    {textContent}
               </div>
               <div className="Images">
                    {images}
               </div>
            </div>
}

