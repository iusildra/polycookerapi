require('dotenv').config()

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "polycooker",
    password: "![*w>&k=\\JK1Gdu~-F>",
    host: process.env.DATABASE_URL,
    database: "PolyCooker",
    port: "5432",
});

module.exports = pool