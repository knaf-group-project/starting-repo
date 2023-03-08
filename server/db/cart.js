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

///ID might cause error 
  
  const getCartByBuyerId = async ({ buyerId }) => {
    const SQL = `
      SELECT * FROM carts
      WHERE buyerId = $1 AND is_active = true;
    `;
    const response = await client.query(SQL, [buyerId]);
    const cart = response.rows[0];
    // get products, and attach to cart
    const productsSQL = `
    SELECT * FROM cart_products
    LEFT JOIN products ON cart_products.EscapeRoomsId = EscapeRooms.id
    WHERE cart_products.cartId = $1
    `;
    const productsResponse = await client.query(productsSQL, [cart.id]);
    cart.products = productsResponse.rows;
    return cart;
  };


  module.exports = {
    getCart,
    createCart ,
    getCartByBuyerId
  }