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

  module.exports = {
    createCart }