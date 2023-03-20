const client = require('./client');

const createEscapeRooms = async({ name, price, briefDescription, mainDescription  }) => {
    const SQL = `
      INSERT INTO EscapeRooms(name, price, briefDescription, mainDescription )
      VALUES($1, $2, $3, $4) 
      RETURNING *
    `;
    const response = await client.query(SQL, [ name, price, briefDescription, mainDescription ]);
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