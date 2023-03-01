const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/EscapeRoom_db');

module.exports = {client};
