const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Events} = require('/models');

events.get() {
events.get="http://api.eventful.com/rest/events/get?...&id&image_sizes"
}

router.get('/events', (req, res) => {
    res.json(Events.get());
});

events.post( {
})

router.post('/events', jsonParser, (req, res) => {
    const requiredFields = ["title", "id", "venue_name", "start_date", "city_name", " description","url"];
     for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing\`${field}\` in request body`
            return res.status(400).send(message);
        }
    }
    const newEvent = Events.create(req.body.title, req.body.id, req.body.venue_name, req.body.start_date, req.body.city_name, req.body.description, req.body.url),
    res.status(201).json(newEvent)
});

events.put()  {
}

router.put('/events/:id', jsonParser, (req, res) => {
        const requiredFields = ['title', 'id', "venue_name", "start_date", "city_name", " description","url"];
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`
                return res.status(400).send(message);
                 }
                }
     if (req.params.id !== req.body.id) {
       const message = `Request path id (${req.params.id}) and request body id (${req.body.id}}) match`;
     return res.status(400).send(message);
    } 
});

events.delete() {
}

router.delete('/events/:id', (req, res) => {
    Events.delete(req.params.id);
    res.status(204).end();
});

module.exports = router;