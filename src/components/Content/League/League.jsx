import React, { useEffect } from 'react'
import './League.css'
import _ from 'lodash';
import Flag from '../../../images/flag.png'
import Game from './Game/Game'
import { withRouter } from 'react-router'

const League = ({ location, data, currentDate, setTomorrow, setToday }) => {
    const currentPath = location.pathname.substr(1).split('/');
    let path = currentPath[1]; // check path 'matches/path'
    let countToday = 0;
    let countTomorrow = 0;
    let totalCount = 0;
    let newArray = []; // leagues array
    let gameArray; // matches arrray
    const matches = []; // filter matches by leagues
    if (data !== null) {
        let items = data.map(item => { return item.league_id })
        let uniqueItems = Array.from(new Set(items)) // create massive of unique leagues id
        uniqueItems.forEach(element => {// eslint-disable-next-line
            let array = data.filter(item => { // create objects of matches for leagues
                if (item.league_id === element) return item
            })
            matches.push(array);
        }) // eslint-disable-next-line
        newArray = matches.map(element => {
            if (path === 'all') { // ALL 
                gameArray = element.map(item => {
                    let timeCurrent = item.time.split(" ");
                    let day = timeCurrent[0].split("-");
                    let time = { yyyy: parseInt(day[0]), mm: day[1], dd: day[2] };
                    let tomorrow = parseInt(currentDate.dd) + 1;
                    let checkData = { yyyy: currentDate.yyyy, mm: currentDate.mm, dd: `${tomorrow}` }
                    if (_.isEqual(time, currentDate)) {
                        countToday++;
                    } else if (_.isEqual(time, checkData)) {
                        countTomorrow++;
                    }
                    return <Game key={item.id} score={item.score} game={item.name} id={item.id} time={item.time} status={item.status} link={item.link} favourite={item.favorite} />
                })
                return <div className="matches-element" key={element[0].league_id}>
                    <div className="matches-element-title">
                        <div className="matches-element-title-flag">
                            <img src={Flag} alt="country flag" />
                        </div>
                        <h4 className="matches-element-title-league">Англия: Премьер-лига</h4>
                    </div>
                    <div className="matches-element-array">
                        {gameArray}
                    </div>
                </div>
            } else if (path === 'today') { // eslint-disable-next-line
                gameArray = element.map(item => {
                    let timeCurrent = item.time.split(" ");
                    let day = timeCurrent[0].split("-");
                    let time = { yyyy: parseInt(day[0]), mm: day[1], dd: day[2] };
                    totalCount++;
                    if (_.isEqual(time, currentDate)) {
                        countToday++;
                        return <Game key={item.id} score={item.score} game={item.name} id={item.id} time={item.time} status={item.status} link={item.link} favourite={item.favorite} />
                    }
                })
                let checkGameArray = Array.from(new Set(gameArray))
                if (!(typeof checkGameArray[0] === 'undefined' && checkGameArray.length === 1)) {
                    return <div className="matches-element" key={element[0].league_id}>
                        <div className="matches-element-title">
                            <div className="matches-element-title-flag">
                                <img src={Flag} alt="country flag" />
                            </div>
                            <h4 className="matches-element-title-league">Англия: Премьер-лига</h4>
                        </div>
                        <div className="matches-element-array">
                            {gameArray}
                        </div>
                    </div>
                }
            } else if (path === 'tomorrow') { // eslint-disable-next-line
                gameArray = element.map(item => {
                    let timeCurrent = item.time.split(" ");
                    let day = timeCurrent[0].split("-");
                    let tomorrow = parseInt(currentDate.dd) + 1;
                    let checkData = { yyyy: currentDate.yyyy, mm: currentDate.mm, dd: `${tomorrow}` }
                    let time = { yyyy: parseInt(day[0]), mm: day[1], dd: day[2] };
                    totalCount++;
                    if (_.isEqual(time, checkData)) {
                        countTomorrow++;
                        return <Game key={item.id} score={item.score} game={item.name} id={item.id} time={item.time} status={item.status} link={item.link} favourite={item.favorite} />
                    }
                })
                let checkGameArray = Array.from(new Set(gameArray))
                if (!(typeof checkGameArray[0] === 'undefined' && checkGameArray.length === 1)) {
                    return <div className="matches-element" key={element[0].league_id}>
                        <div className="matches-element-title">
                            <div className="matches-element-title-flag">
                                <img src={Flag} alt="country flag" />
                            </div>
                            <h4 className="matches-element-title-league">Англия: Премьер-лига</h4>
                        </div>
                        <div className="matches-element-array">
                            {gameArray}
                        </div>
                    </div>
                }
            }
        })
    }
    useEffect(() => {
        if (path === 'tomorrow') {
            setTomorrow(countTomorrow);
            setToday(totalCount - countTomorrow)
        } else if (path === 'today') {
            setToday(countToday)
            setTomorrow(totalCount - countToday)
        } else {
            setTomorrow(countTomorrow);
            setToday(countToday)
        }// eslint-disable-next-line
    }, [newArray])
    return (
        <>
            {newArray}
        </>
    )
}

export default withRouter(League);