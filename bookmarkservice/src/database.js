const {Client} = require('pg')
const client = new Client({
    host: process.env.DB_HOST || 'hedspi.dev',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.POSTGRES_DB || 'ltweb'
});

module.exports = {client};