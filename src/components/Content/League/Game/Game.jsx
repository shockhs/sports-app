import React from 'react'
import './Game.css'
import { NavLink } from 'react-router-dom'
import minus from '../../../../images/disabled.png'
import plus from '../../../../images/enabled.png'


const Game = ({ time, game, id, status, link, score, favourite }) => {
    const timeArray = time.split(' ')[1].split(':');
    return (
        <>
            <div className="matches-element-array-item" key={id}>
                <div className="matches-element-array-item-time">
                    {timeArray[0] + ':' + timeArray[1]}
                </div>
                <div className="matches-element-array-item-game">
                    <div className="matches-element-array-item-game-about">
                        {game}
                    </div>
                    <div className="matches-element-array-item-game-special">
                        <div className="matches-element-array-item-game-special-score">{score}</div>
                        <div className="matches-element-array-item-game-special-favourite">
                            <img onMouseOver={e => {
                                if (e.currentTarget.src === minus) {
                                    e.currentTarget.src = plus
                                }
                                else { e.currentTarget.src = minus }
                            }} onMouseOut={e => {
                                if (e.currentTarget.src === minus) {
                                    e.currentTarget.src = plus
                                }
                                else { e.currentTarget.src = minus }
                            }}
                                src={(favourite === 1 ? plus : minus)} alt="" />
                        </div>
                    </div>
                </div>
                <div className="matches-element-array-item-status">{status}</div>
                <div className="matches-element-array-item-about">
                    <NavLink to={link}>Подробнее</NavLink>
                </div>
            </div >
        </>
    )
}

export default Game