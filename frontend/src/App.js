import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios'
import TableCountries from './components/TableCountries'
import Ad from './components/GoogleAd'
import Chart from 'chart.js'


function App() {

  const [top20, setTop20]         = useState({countries_stat: []})
  const [countries, setCountries] = useState({countries_stat: []})
  const [takenAt, setTakenAt]     = useState()

  useEffect( ()=> {
    axios({
      method:"GET",
      // TODO implement environmental variables for Create React App
      // url: process.env.ENVIRONMENT == 'prod' ? 'http://coronaworldmeters.com/covid' : 'http://localhost:3003/api/covid',
      url: 'http://coronaworldmeters.com/api/covid',
      // url: 'http://localhost:3003/api/covid',
    })
    .then( response => {
      console.log(response.data)

      let rest = response.data.countries_stat
      rest.splice(0,1)
      rest.pop() // TODO place China on right position, sort table
      let top20 = rest.splice(0,20)

      setTop20(top20)
      setCountries(rest)
      setTakenAt(response.data.statistic_taken_at)

      createChart('cases_top20', top20)
      createChart('cases_rest', rest)
    })
    .catch( error => console.log(error) )
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <div className="statistics-taken">Statistics taken at: {takenAt}</div>

          <h1 className="section-header">Most COVID-19 cases per country - Top 20 </h1>
          <TableCountries list={top20} />
          <div className="chartjs">
            <canvas id="cases_top20" width="400" height="100%"></canvas>
          </div>

          {/* <Ad></Ad> */}

          <h1 className="section-header">COVID-19 cases for all countries</h1>
          <TableCountries list={countries} />
          <div className="chartjs">
            <canvas id="cases_rest" width="400" height="100%"></canvas>
          </div>
      
      </header>
    </div>
  );
}

function createChart(element, data) {
  const ctx = document.getElementById(element);
  // ctx.height = 300;
  
  let labels = data.map( country => country.country_name )
  let values = data.map( country => parseInt( country.cases.replace(/,/,'') ) )

  let backgroundColor = []
  let borderColor = []

  values.map( e => {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    backgroundColor.push(`rgba(${r},${g},${b}, 0.2)`)
    borderColor.push(`rgba(${r},${g},${b}, 1)`)
  })
  // console.log(labels)
  // console.log(values)

  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Cases Total',
              data: values,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                      }
                  }
              }]
          }
      }
  });
}

export default App;