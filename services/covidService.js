const axios = require('axios')

function apiRequest(endpoint, callback=null, params=null) {
    return new Promise( (resolve,rej) => {
        axios({
					method:"GET",
					url:process.env.RAPID_API_URL+endpoint,
					headers:{
					"content-type":"application/octet-stream",
					"x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
					"x-rapidapi-key":process.env.RAPID_API_KEY,
					},
					params:{
						...(params ? {country: params.country} : {})
					}
        })
        .then( async response => resolve(response.data) )
        .catch( error => rej(error) )
    })
}

module.exports = apiRequest