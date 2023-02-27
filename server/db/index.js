const client = require('./client');
const { createEscapeRooms } = require('./EscapeRooms');
const { createCart } = require('./cart')
const { addProductsToCart } = require('./cart_products')

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

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {  username: 'moe',  password: 'moe_password'},
      { username: 'lucy',  password: 'lucy_password' },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createAllEscapeRooms() {
  try {
    console.log("Starting to create EscapeRooms...");

    const escapeRoomsToCreate = [
      {
        name: "Escape Room 1",
        description: "TBA",
      },
      {
        name: "Escape Room 2",
        description: "TBA ",},
      {
        name: "Escape Room 3",
        description: "TBA",
      },
      {
        name: "Escape Room 4",
        description: "TBA",
      },
      {
        name: "Escape Room 5",
        description: "TBA ",
      }
    
    ];
    const EscapeRooms = await Promise.all(
      escapeRoomsToCreate.map(createEscapeRooms)
    );

    console.log("EscapeRooms created:");
    console.log(EscapeRooms);

    console.log("Finished creating EscapeRooms!");
  } catch (error) {
    console.error("Error creating EscapeRooms!");
    throw error;
  }
}


const syncAndSeed = async()=> {
  await syncTables();
  await createInitialUsers();
  await createAllEscapeRooms();
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
