const express = require('express')
const router = express.Router()
const Covid = require('../models/covid')
const Visitor = require('../models/visitor')
const  service = require('../services/covidService')


// Getting all
router.get('/', (req,res) => {
    console.log('Request made')
    const visitor = new Visitor({
      ip: req.connection.remoteAddress || req.socket.remoteAddress,
      browser: req.headers['user-agent'],
    })
    visitor.save()

    service('/cases_by_country.php')
    .then( async (response)=>{
        // console.log(response)
        const covid = new Covid({
          apiResponseBody: JSON.stringify(response),
          visitor: {
            ip: req.connection.remoteAddress || req.socket.remoteAddress
          }
        })
        try {
          response.DbRes = await covid.save()
        } catch (err) {response.DbRes = err}
        // response.DbRes.apiResponseBody = JSON.parse(response.DbRes.apiResponseBody)
        
        res.send(response)
      })
      .catch( (error) => res.send(error) )
})

// Get affected countries
router.get('/countries', (req, res) => {
  service('/affected.php')
  .then( countries => res.send(countries) )
})

// World stats
router.get('/world_stats', (req, res) => {
  service('/worldstat.php')
  .then( stats => res.send(stats) )
})

// Getting by country
router.get('/:id', (req, res) => {
    service('/latest_stat_by_country.php', ()=>{}, {country: req.params.id})
    .then( data => res.send(data) )
})

// Save to local DB
router.post('/', (req, res) => {

})

// Update
router.patch('/:id', (req, res) => {})

// Delete
router.delete('/:id', (req, res) => {})



module.exports = router