import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../scss/world_statistics.scss'


const WorldStats = () => {

    const [totals, setTotals] = useState({})

    useEffect( () => {
        axios({
            method:"GET",
            url: 'https://coronaworldmeters.com/api/covid/world_stats',
        })
        .then( response => {
            console.log(response.data)
            setTotals(response.data)
        })
        .catch( error => console.log(error) )
    },[])

    return (
        <div className="world_statistics_wrapper">
            <h4>Coronavirus Cases:</h4>
            <h3 className="cases">{totals.total_cases}</h3>

            <h4>Total Deaths</h4>
            <h3 className="deaths">{totals.total_deaths}</h3>

            <h4>Total Recovered</h4>
            <h3 className="recovered">{totals.total_recovered}</h3>

        </div>
    )
}

export default WorldStats