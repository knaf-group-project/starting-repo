const client = require('./client');


async function addProductsToCart({ checkoutId, EscapeRoomsId}) {
    try {
      const { rows: [ cart_products ] } = await client.query(`
        INSERT INTO cart_products ("checkoutId", "EscapeRoomsId") 
        VALUES ($1, $2) 
        ON CONFLICT ("checkoutId", "EscapeRoomsId") DO NOTHING
        RETURNING *;
      `, [checkoutId, EscapeRoomsId]);
      return cart_products;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  module.exports = {
    addProductsToCart
  }