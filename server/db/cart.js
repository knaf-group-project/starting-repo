const client = require('./client');

const createCart = async({ buyerId }) => {
    try {
      const {rows: [cart]} = await client.query(`
        INSERT INTO cart ("buyerId")
        VALUES($1)
        RETURNING *;
      `, [buyerId]);
        return cart;
    } 
    catch (error) {
      console.log(error)
      throw error
     }
  }

  const getCart = async() => {
    const SQL = `
      SELECT * 
      FROM cart
    `;
    const response = await client.query(SQL);
    return response.rows; 
  }

  module.exports = {
    getCart,
    createCart }