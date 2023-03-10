const client = require('./client');
const { createEscapeRooms, getRooms } = require('./EscapeRooms');
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
      briefDescription TEXT,
      mainDescription TEXT
    );
    
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "buyerId" INTEGER REFERENCES users(id) NOT NULL,
      is_active BOOLEAN DEFAULT true
    );

      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES cart(id),
        "EscapeRoomsId" INTEGER REFERENCES EscapeRooms(id),
        UNIQUE ("cartId", "EscapeRoomsId")
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
    return users;
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
  
}

async function createUserCart (users){
  console.log("Starting to create users cart...");
  try{
    const carts = await Promise.all(users.map(user => createCart({ buyerId: user.id })));
    
    console.log("Carts created:");
    console.log(carts);
    console.log("Finished creating carts!");
  } catch (error) {
    console.error("Error creating carts!");
    throw error;
  }
}



async function createAllEscapeRooms() {
  try {
    console.log("Starting to create EscapeRooms...");

    const escapeRoomsToCreate = [
      {
        name: "Escape Space",
        briefDescription: "brief tba",
        mainDescription: "main tba",
      },
      {
        name: "Escape Room 2",
        briefDescription: "brief tba ",
        mainDescription: "main tba",
      },
      {
        name: "Escape Room 3",
        briefDescription: "brief tba",
        mainDescription: "main tba",
      },
      {
        name: "Escape Room 4",
        briefDescription: "brief tba",
        mainDescription: "main tba",
      },
      {
        name: "Escape Room 5",
        briefDescription: "brief tba ",
        mainDescription: "main tba",
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
  const users = await createInitialUsers();
  await createAllEscapeRooms();
  await createUserCart(users);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken
};
