import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios'
import TableCountries from './components/TableCountries'
import Ad from './components/GoogleAd'


function App() {

  const [countries, setCountries] = useState({countries_stat: []})

  useEffect( ()=> {

    axios({
      method:"GET",
      // TODO implement environmental variables for Create React App
      // url: process.env.ENVIRONMENT == 'prod' ? 'http://coronaworldmeters.com/covid' : 'http://localhost:3003/api/covid',
      url: 'http://coronaworldmeters.com/api/covid',
      // url: 'http://localhost:3003/api/covid',
    })
    .then( response => {
      // console.log(response.data)
      setCountries(response.data)
    })
    .catch( error => console.log(error) )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className="statistics-taken">Statistics taken at: {countries.statistic_taken_at}</div>

        <TableCountries list={countries.countries_stat} />
        <Ad></Ad>
      </header>
    </div>
  );
}

export default App;
