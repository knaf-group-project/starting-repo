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

const getCartByBuyerId = async ({ buyerId }) => {
    let SQL = `
      SELECT * FROM cart
      WHERE "buyerId" = $1
    `;
    let response = await client.query(SQL, [buyerId]);
    if(response.rows.length === 0){
      SQL = `
        INSERT INTO CART("buyerId")
        VALUES($1) RETURNING *;
      `;
      response = await client.query(SQL, [buyerId]);
    }
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


const getCart = async() => {
    const SQL = `
      SELECT * 
      FROM cart
    `;
    const response = await client.query(SQL);
    return response.rows; 
  }

// purchase cart
const purchaseCart = async ({ cartId, buyerId }) => {
  const SQL = `
  UPDATE cart
  SET is_active = false
  WHERE id = $1
  `;
  await client.query(SQL, [cartId]);
  const newCart = await createCart({ buyerId });
  return newCart;
};

  module.exports = {
    getCart,
    createCart ,
    getCartByBuyerId,
    purchaseCart
  }
