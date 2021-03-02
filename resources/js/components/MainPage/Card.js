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
            images = ['https://res.cloudinary.com/df6ytp5bl/image/upload/v1614707471/portfolio/qrcodes-2_wysj1r.jpg'
        ]
            break;
        case  2:
            textContent = <div>
            <h2 className="Underlinie">Step 2</h2>
            <p>Add items, and make your own color theme for the checkout page. </p>
        </div>
            images = ['https://res.cloudinary.com/df6ytp5bl/image/upload/v1614707472/portfolio/qrcode-4_htrumo.jpg',]
            break;
        case  3:
            textContent = <div>
            <p>Use our modern control panel to keep track of your items, generate or download codes, and make changes.</p>
            </div>
            images = ['https://res.cloudinary.com/df6ytp5bl/image/upload/v1614707472/portfolio/qrcodes-3_jfv4mv.jpg',]
            break;
        case  4:
            textContent = <div>
            <p>You can also keep track of any transactions and related shippments that need to be sent</p>
            <p>Simply click the envelope button when merch is on the way and the customer will be notified</p>
            </div>
            images = ['https://res.cloudinary.com/df6ytp5bl/image/upload/v1614707474/portfolio/qrcode-5_blyzhk.jpg', 'https://res.cloudinary.com/df6ytp5bl/image/upload/v1614707473/portfolio/qrcode-6_pghj7v.jpg']
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

