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

///ID might cause error 
const getCartByBuyerId = async ({ buyerId }) => {
    const SQL = `
      SELECT * FROM cart
      WHERE "buyerId" = $1
    `;
    const response = await client.query(SQL, [buyerId]);
    const cart = response.rows[0];
    console.log('THE CART:', cart )
    //get products, and attach to cart
    const productsSQL = `
    SELECT * FROM cart_products
    LEFT JOIN EscapeRooms ON cart_products."EscapeRoomsId" = EscapeRooms.id
    WHERE cart_products."cartId" = $1
    `;
    const EscapeRoomsResponse = await client.query(productsSQL, [cart.id]);
    console.log('CART PRODUCTS:', EscapeRoomsResponse.rows)
    cart.EscapeRooms = EscapeRoomsResponse.rows;
    return cart;
};

const addEscapeRoomToCart = async ({ cartId, EscapeRoomsId})=>{
//check if escape room is already in cart
// const checkSQL = `
//   SELECT * FROM cart_products
//   WHERE cartId = $1 And EscapeRoomsId = $2
// `;

// const checkResponse = await client.query(checkSQL, [cartId, EscapeRoomsId]);
// if(checkResponse.rows.length){
//   await client.query(
//     `UPDATE cart_products WHERE cartId = $1 AND EscapeRoomsId = $2`
//   )`
// }

  const SQL = 
  `INSERT INTO cart_products(cartId, EscapeRoomsId,)
    VALUES($1, $2)
    RETURNING *
  `;
  const response = await client.query(SQL, [EscapeRoomsId, cartId])
  return;
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
    createCart ,
    getCartByBuyerId
  }