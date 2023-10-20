const axios = require('axios');
const url_ptit = process.env.URL_PTIT || "http://139.162.47.179:3040"

const api = axios.create({
    baseURL: url_ptit,
});

module.exports = api;
