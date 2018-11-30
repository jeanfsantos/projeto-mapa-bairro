const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const DATA_LOCATIONS = require('./data.json');

const PORT = 8080;
const apiKey =
    'HEaVrGiGd3dj_aycIs-uLvl6_HCjk5ZNEoqT5NjtULNU0zn23a2SyJiwswFCTLHnmpCeyP9NifFyyFf5FtccD_FfUqf30UiUi0nIGo0Rhs35OAeqO3oAHgTbsfntW3Yx';
const app = express();
const client = yelp.client(apiKey);

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/initial-markers', (req, res) => {
    res.send(DATA_LOCATIONS);
});

app.get('/api/info-location', (req, res) => {
    const marker = req.query;
    const searchRequest = {
        term: marker.title,
        latitude: marker.lat,
        longitude: marker.lng
    };

    client
        .search(searchRequest)
        .then(response => {
            const firstResult = response.jsonBody.businesses[0];
            res.send(firstResult);
        })
        .catch(e => {
            res.send(e);
        });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
