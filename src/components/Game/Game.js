import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash-es';
import './Game.scss';
import Card from '../Card/Card';
import StartGame from '../StartGame/StartGame';
import Score from '../Score/Score';



export default function Game() {

    const [allCards, setAllCards] = useState([]); // all cards consist of country flags.
    const [chosenCards, setChosenCards] = useState([]); // randomly chosen among all cards.
    const [flippedCards, setFlippedCards] = useState([]); // cards we flipped.
    const [doneCards, setDoneCards] = useState([]); // cards we remembered right.
    const [score, setScore] = useState(0); // score 

    function createRandomCards(numberOfCards = 10, cards) {
        setScore(0); // reset the score        
        let random = 0;
        let randomCards = [];
        for (let i = 0; i < numberOfCards; i++) {
            random = Math.floor(Math.random() * cards.length);
            randomCards.push({image: cards[random], id: i, flipped: false, done: false}); // when we click, flipped will be true.
            randomCards.push({image: cards[random], id: numberOfCards+i, flipped: false, done: false}); // when we remember correctly, done will be true.
        }
        randomCards = shuffle(randomCards); // shuffle the cards
        setChosenCards(randomCards)
    }

    // get the flags
    function fetchFlags()  {
        fetch("https://restcountries.eu/rest/v2/all")
        .then((reponse) => reponse.json())
        .then((data) => {
            const allFlags = data.map((data) => {   
                return data.flag;
            })          
            setAllCards(allFlags)           
        }, console.error)
    }

    function accessFlipped(option = 'normal') {       
        setTimeout(() => {
            if (option === 'normal' && ((flippedCards[0].image === flippedCards[1].image) && (flippedCards[0].id !== flippedCards[1].id ))) {              
                flippedCards[0].done = true;
                flippedCards[1].done = true;
                setDoneCards(doneCards => ([...doneCards,flippedCards]));;
                setScore(score + 10)
            }
        }, 1000)

        if (option === 'clear') {
            flippedCards.map((card) => {
                return card.flipped = false;
            })
            setFlippedCards(flippedCards => ([]))
        }
    }

    function clickHandler(card) {
        if (flippedCards.length < 2 && card.done === false) {           
            card.flipped = true;
            setFlippedCards(flippedCards => ([...flippedCards,card]))              
        }
    }

    function getScore() {       
        return score
    }

    useEffect(() => {
        fetchFlags()        
    }, []);

    useEffect(() => {       
        if (flippedCards.length === 2) {            
            setTimeout(() => {               
                accessFlipped('normal')
            }, 700)

            setTimeout(() => {              
                accessFlipped('clear')
            }, 1000)                  
        }       
    })

    return (
        <div className="game-container">
            <StartGame
                onClick = {() => createRandomCards(12, allCards)}
                innerHTML = {`Start The Game`}        
            />
            <div className="cards-container">
                {chosenCards.map((card) => {
                    return (
                        <Card 
                            image = {card.image}
                            flipped = {card.flipped}
                            done = {card.done}
                            onClick = {() => clickHandler(card)}
                        />
                    )
                })}               
            </div>  
            <IsGameEnd
                doneCards = {doneCards}
                chosenCards = {chosenCards}
                score = {score}
            />
            <Score
                getScore = {getScore}
            />
        </div>
    
        
    )
}


const IsGameEnd = (props) => {
    const {doneCards, chosenCards} = props;
    if((doneCards.length * 2 === chosenCards.length && doneCards.length > 0)) {
        return <h1 className="game-end">Congratulations!</h1>
    }
    return <></>
}
