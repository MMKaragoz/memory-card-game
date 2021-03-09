import React from 'react'
import './Card.scss';

export default function Card ({image, flipped, done, onClick}) {

    return (
        <div className={`card ${flipped ? 'opened' : ''} ${done ? 'done' : ''}`} onClick={onClick}>
            <div className="front">
                ?
            </div>
            <div className="back">
                <img src={image} alt="idk" className=""/>
            </div>
        </div>
    )
}
