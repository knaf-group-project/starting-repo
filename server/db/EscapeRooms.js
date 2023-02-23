const client = require('./client');

const createEscapeRooms = async({ name, description }) => {
    const SQL = `
      INSERT INTO EscapeRooms(name, description)
      VALUES($1, $2) 
      RETURNING *
    `;
    const response = await client.query(SQL, [ name, description ]);
    return response.rows[0];
  }

  module.exports = {
    createEscapeRooms }