import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import './scss/Cards.scss';




export default function Cards(props) {
    const [card, setCard] = useState(1);
    let nextSwitch = useRef();

    const switchCard = card => {
        clearTimeout(nextSwitch.current)
        setCard(null);
        setTimeout( () => setCard(card), 0)
        
    }
    

    useEffect(() => {
        
        if(card) {
            nextSwitch.current = setTimeout(() => {
                setCard(null);
                 setCard(card === 5 ? 1 : card + 1 )
            }, 10000)
        }
       
    }, [card])
    
    let cards = [1,2,3,4,5].map( cKey => {
        let bubbleClass = cKey === card ? "Bubble Active" : "Bubble";
        return <div onClick={ () => switchCard(cKey)} key={`B${cKey}`} className= {bubbleClass}></div>
    } )
    
    return <div className= "Cards">
                <div className = "Control">
                    <div className = "Swap">
                        {cards}
                    </div>
                </div>
                <div className = "Display">
                    {card ? <Card cardNumber = {card} /> :null}
                </div>
            </div>
}

if (document.getElementById('mainCards')) {
    ReactDOM.render(<Cards/>, document.getElementById('mainCards'));
}

