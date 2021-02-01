import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import './scss/Cards.scss';




export default function Cards(props) {
    const [card, setCard] = useState('1');
    let nextSwitch = useRef();

    const switchCard = card => {
        clearTimeout(nextSwitch.current)
        setCard(card);
    }
    let deck = {
        1 : {
            text: "asdasd   asdas d asd das d asd a"
        },
        2 : {
            text: "sdfd   asdasdasd sadas da "
        },
        3 : {
            text: "asdasd   8888888888888888888"
        }
    }

    useEffect(() => {
        let cardNum = Number(card)
        nextSwitch.current = setTimeout(() => {
            setCard((cardNum === 3 ? 1 : cardNum + 1 ).toString());
        }, 5000)
    }, [card])
    
    let cards = Object.keys(deck).map( cKey => {
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
                    <Card content = {deck[card]} />
                </div>
            </div>
}

if (document.getElementById('mainCards')) {
    ReactDOM.render(<Cards/>, document.getElementById('mainCards'));
}

