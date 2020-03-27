import React, { useState, useEffect } from 'react'
import './Menu.css'
import Opened from '../../images/open.png'
import Closed from '../../images/close.png'
import Cross from '../../images/cross.png'
import * as axios from 'axios'
import { Link } from 'react-router-dom';

const Menu = (props) => {
    let renderCountryElement, renderLeaguesElement;
    const [leagues, setLeagues] = useState(null); // DATA LEAGUES
    const [isClicked, setIsClicked] = useState(false); // CHECK CLICKED STATUS FOR SPECIAL <LI>
    const [clickedName, setClickedName] = useState([]); // CONTROL OPENED MENUS
    const [countries, setCountries] = useState(null); // DATA COUNTRIES
    useEffect(() => { // GET COUNTRY DATA
        const fetchCountries = async () => {
            await axios.get(`http://u0362146.plsk.regruhosting.ru/country`, {
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => {
                    setCountries(res.data);
                })
        }
        fetchCountries();
        return () => {
        };
    }, []);
    useEffect(() => { // GET LEAGUE DATA
        const fetchLeagues = async () => {
            await axios.get(`http://u0362146.plsk.regruhosting.ru/league`, {
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => {
                    setLeagues(res.data);
                })
        }
        fetchLeagues();
        return () => {
        };
    }, []);
    const handleClickOpen = (name) => { 
        if (clickedName.includes(name)) { // CHECK IS ALREADY CLICKED
            let newArray = clickedName.map(item => { if (item !== name){return item} else {return null} })
            setClickedName(newArray);
            setIsClicked(false);
        } else {
            clickedName.push(name)
            setIsClicked(true)
        }
    }
    if (countries === null) {
        renderCountryElement = <h4>Loading...</h4>
    } else {
        renderCountryElement = countries.map(item => {
            return <li key={item.id}><Link to="#">{item.country}</Link></li>
        })
    }
    if (leagues === null) {
        renderLeaguesElement = <h4>Loading...</h4>
    } else {
        console.log(leagues)
        renderLeaguesElement = leagues.map(data => {
            return <li key={data.id}>
                <label className="checkbox1" htmlFor={'checkbox' + data.id}>
                    {data.league}
                    <img src={((clickedName.includes(data.league) && isClicked) ? Closed : Opened)} width="9" height="5" alt="Icon of menu" />
                </label>
                <input id={'checkbox' + data.id} type="checkbox" className="checkbox" onChange={() => { handleClickOpen(data.league) }} />
                <ul className="list">
                    {data.items.map(cup => {
                        return <li key={cup.id}>
                            <label className="checkbox1">
                                <Link className="submenu-link" to="#">{cup.item}</Link>
                                <img src={Cross} width="8" height="8" alt="Icon of menu" />
                            </label>
                            <input id={'checkbox' + data.id} type="checkbox" className="checkbox" />
                        </li>
                    })}
                </ul>
            </li >
        })
    }

    return (
        <aside>
            <div className="leagues">
                <div className="leagues-title">Мои лиги</div>
                <ul className="leagues-menu">
                    {renderLeaguesElement}
                </ul>
            </div>
            <div className="leagues">
                <div className="leagues-title">Страны</div>
                <ul className="leagues-menu">
                    {renderCountryElement}
                </ul>
            </div>
        </aside >
    )
}

export default Menu