const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');


const syncTables = async()=> {
  try{
    console.log("Dropping all tables...");
    await client.query(`
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS EscapeRooms;
    DROP TABLE IF EXISTS users;
  `);
  
  await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  
    CREATE TABLE EscapeRooms(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT
    );
    
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      “buyerId” INTEGER REFERENCES users(id)
    );

    

      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        "EscapeRoomsId" INTEGER REFERENCES EscapeRooms(id),
        "checkoutId" INTEGER REFERENCES cart(id),
        UNIQUE ("EscapeRoomsId", "checkoutId")
      );
  `);
    console.log("Tables created!");
  } catch (error) {
    console.error("Error syncing tables:", error);
    throw error;
  }
}

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
