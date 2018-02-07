const express = require('express');
const app = express();
app.use(express.static('public'));

app.all('/', (req, res) => res.status(201).send('ok'));;
app.listen(process.env.PORT || 8080);
