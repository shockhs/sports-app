import React, { useState, useEffect } from 'react'
import './Content.css'
import * as axios from 'axios'
import { NavLink } from 'react-router-dom'
import Calendar from '../../images/calendar.png'
import League from './League/League'


const Content = (props) => {
    const [data, setData] = useState(null);
    const [today, setToday] = useState(0);
    const [tomorrow, setTomorrow] = useState(0);

    useEffect(() => {
        const fetchLeagues = async () => {
            await axios.get(`http://u0362146.plsk.regruhosting.ru/match`, {
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                setData(res.data);
            })
        }
        fetchLeagues();
    }, [])
    const getCurrentDate = (control) => {
        const getWeekDay = (date) => {
            let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
            return days[date.getDay()];
        }
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        if (control) {
            return { yyyy, mm, dd }
        } else {
            let date = new Date(yyyy, mm - 1, dd);
            return today = dd + '.' + mm + ' ' + getWeekDay(date)
        }
    }
    return (
        <main>
            <div className="filters">
                <div className="filters-tabs">
                    <NavLink to="/matches/today">Сегодня ({today})</NavLink>
                    <NavLink to="/matches/tomorrow">Завтра ({tomorrow})</NavLink>
                    <NavLink to="/matches/all">Все ({today + tomorrow})</NavLink>
                </div>
                <div className="filters-date">
                    <img src={Calendar} alt="calendar icon" />
                    <div className="filters-date-content">
                        {getCurrentDate(false)}
                    </div>
                </div>
            </div>
            <div className="matches">
                <League data={data} setToday={setToday} setTomorrow={setTomorrow} currentDate={getCurrentDate(true)} />
            </div>
        </main>
    )
}

export default Content