const express = require('express')
const router = express.Router()
const Covid = require('../models/covid')
const  service = require('../services/covidService')
// const LogVisitor = require('../middlewares/LogVisitor')


// Getting all
router.get('/', async (req,res) => {
    
    let lastCovidRecord;
    let lastRecordTimestamp;
    let currentTimestamp;

    await Covid.findOne({}, {}, { sort:{'apiResponseDate':-1} },  
      (err,record) => lastCovidRecord = record )

    if (lastCovidRecord !== null) {
      lastRecordTimestamp = new Date(lastCovidRecord.apiResponseDate).getTime() / 1000
      currentTimestamp = new Date().getTime() / 1000
      console.log('Last request ',Math.floor(currentTimestamp - lastRecordTimestamp),'s ago')
    }

    if ( (currentTimestamp-lastRecordTimestamp) > 10*60 || lastCovidRecord === null ) {
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
        
        console.log('New Api request')
        res.send(response)
      })
      .catch( (error) => res.send(error) )
    }
    else {
      console.log('Res from memory')
      res.send(lastCovidRecord.apiResponseBody)
    }

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