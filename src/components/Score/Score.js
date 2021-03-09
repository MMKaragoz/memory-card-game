import React from 'react';
import './Score.scss'

export default function Score({getScore}) {
    
    return (
        <div>
            <p className="score">Score:  {getScore()}</p> 
        </div>
    )
}
