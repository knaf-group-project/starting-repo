const client = require('./client');


async function addProductsToCart({ cartId, EscapeRoomsId}) {
  console.log(cartId)
  console.log(EscapeRoomsId)
    try {
      const { rows: [ cart_products ] } = await client.query(`
        INSERT INTO cart_products ("cartId", "EscapeRoomsId") 
        VALUES ($1, $2) 
        ON CONFLICT ("cartId", "EscapeRoomsId") DO NOTHING
        RETURNING *;
      `, [cartId, EscapeRoomsId]);
      return cart_products;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  // delete room from cart
  const deleteRoomFromCart = async ({ cartId, EscapeRoomsId }) => {
    const SQL = `
      DELETE FROM cart_products
      WHERE "cartId" = $1 AND "EscapeRoomsId" = $2
    `;
    await client.query(SQL, [EscapeRoomsId, cartId]);
    return;
  };

  module.exports = {
    addProductsToCart,
    deleteRoomFromCart
  }