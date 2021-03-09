import React from 'react'
import './StartGame.scss'

export default function StartGame({onClick, innerHTML}) {
    return (    
        <button className="button" onClick={onClick}>
            {innerHTML}
        </button>    
    )
}
