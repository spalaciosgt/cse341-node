const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello Samuel Palacios!');
});

module.exports = routes;