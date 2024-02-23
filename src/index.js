import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const getStarshipData = async () => {
    try {
        const response = await axios.get('https://www.swapi.tech/api/starships?page=1&limit=100')
        return response.data.results;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getStarshipDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.result.properties;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const calculateStarshipStops = (starship, distance) => {
	const [time, unity] = starship.consumables.split(" ")

	if(starship.MGLT == 'unknown' || time == "unknown") return "unknown"

	switch (unity){
		case "week":
		case "weeks":
			return parseInt((distance/starship.MGLT)/(time * 168));
		case "year":
		case "years":
			return parseInt((distance/starship.MGLT)/(time * 8766))
		case "month":
		case "months":
			return parseInt((distance/starship.MGLT)/(time * 730.5))
		case "day":
		case "days":
			return parseInt((distance/starship.MGLT)/(time * 24))
		case "hour":
		case "hours":
			return parseInt((distance/starship.MGLT)/(time))
	}
	return "unknown"
}

const returnStarshipStopsData = (starships, distance) => {
	const result = starships.map((starship) => (
		{
			name: starship.name,
			stops: calculateStarshipStops(starship, distance)
		}
	))

	return result
}

app.get('/starships', async (req, res) => {
	const {distance} = req.query
    try {
		if(!distance) return res.status(422).send("Parâmetro 'distance' não foi enviado.")
        const starships = await getStarshipData();
        const detailedStarships = await Promise.all(starships.map(async (starship) => {
            const details = await getStarshipDetails(starship.url);
            return details;
        }));
        const starshipsStops = returnStarshipStopsData(detailedStarships, distance)
        res.send(starshipsStops).status(200);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT || 5050, () => {
	console.log('Server running on port ' + process.env.PORT)
})