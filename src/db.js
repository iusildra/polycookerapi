require("dotenv").config();

const database = process.env.DATABASE_URL;
const regex_user = /\/[\w\d]+:/;
const user = regex_user[Symbol.match](database)[0].slice(1, -1);
const regex_passwd = /:[^:.]+@/;
const passwd = regex_passwd[Symbol.match](database)[0].slice(1, -1);
const regex_host = /@.+\:/;
const host = regex_host[Symbol.match](database)[0].slice(1, -1);
const regex_port = /:\d+\//;
const port = regex_port[Symbol.match](database)[0].slice(1, -1);
const regex_db_name = /[\d\w]+$/;
const db_name = regex_db_name[Symbol.match](database)[0];

const Pool = require("pg").Pool;
const pool = new Pool({
    user: user,
    password: passwd,
    host: host,
    database: db_name,
    port: port,
});

module.exports = pool;
