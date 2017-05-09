const {Question: Model} = require(`mongoose`).models;
const routes = require(`./../../lib/defaultRoutes`)(Model);

module.exports = [...routes];
