import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'


const Header = (props) => {
    return (
        <header>
            <nav role="navigation">
                <div id="menuToggle">
                    <div className="center">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <h2>Меню</h2>
                            <li><NavLink to="/matches/all">Все</NavLink></li>
                            <li><NavLink to="/live">Live</NavLink></li>
                            <li><NavLink to="/results">Результаты</NavLink></li>
                            <li><NavLink to="/schedule">Расписание</NavLink></li>
                            <li><NavLink to="/predictions">Прогнозы</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="logo">
                Расписание матчей
                </div>
            <nav className="left-header">
                <ul>
                    <li><NavLink to="/matches/all">Все</NavLink></li>
                    <li><NavLink to="/live">Live</NavLink></li>
                    <li><NavLink to="/results">Результаты</NavLink></li>
                    <li><NavLink to="/schedule">Расписание</NavLink></li>
                    <li><NavLink to="/predictions">Прогнозы</NavLink></li>
                </ul>
            </nav>
            <div className="right-header">
                <input type="text" placeholder="" />
                <button className="right-header-join">Войти</button>
            </div>
        </header >
    )
}

export default Header