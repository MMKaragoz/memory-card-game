import React from 'react'
import './StartGame.scss'

export default function StartGame({onClick, innerHTML}) {
    return (
        <div>
            <button className="button" onClick={onClick}>
                {innerHTML}
            </button>
            
        </div>
    )
}
