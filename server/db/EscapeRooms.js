const client = require('./client');

const createEscapeRooms = async({ name, briefDescription, mainDescription  }) => {
    const SQL = `
      INSERT INTO EscapeRooms(name, briefDescription, mainDescription )
      VALUES($1, $2, $3) 
      RETURNING *
    `;
    const response = await client.query(SQL, [ name, briefDescription, mainDescription ]);
    return response.rows[0];
  }

const getRooms = async() => {
  const SQL = `
    SELECT * 
    FROM EscapeRooms
  `;
  const response = await client.query(SQL);
  return response.rows; 
}


  module.exports = {
    createEscapeRooms,
    getRooms 
  }