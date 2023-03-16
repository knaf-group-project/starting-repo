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
        briefDescription: "You are trapped on a spaceship and must solve puzzles to repair the ship's systems and make it back to Earth.",
        mainDescription: "Your mission to explore the galaxy has gone awry when your spaceship is damaged by a meteor shower. You are now stranded in space and must repair your ship's systems in order to make it back to Earth before you run out of oxygen.",
      },
      {
        name: "Escape Factory",
        briefDescription: "You are locked in a mysterious factory and must solve puzzles to escape before time runs out.",
        mainDescription: "You've been lured into a mysterious factory by a mad scientist who wants to test your intelligence. He has locked you in and given you one hour to escape before his experiments begin.",
      },
      {
        name: "Escape Gallery",
        briefDescription: "You are an art thief who has been trapped in a museum and must solve puzzles to escape before the police arrive.",
        mainDescription: "You're a master art thief who has finally found your next target - a rare painting hidden in a museum. However, when the security system is triggered, you find yourself locked inside and must solve the puzzles to escape before the police arrive.",
      },
      {
        name: "Escape Library",
        briefDescription: "You are locked in an old library and must solve puzzles to uncover a secret hidden within its walls.",
        mainDescription: "The old library is full of mysteries and secrets, and you've been tasked with uncovering a hidden treasure within its walls. However, when the doors lock behind you, you realize that you are trapped and must solve the puzzles within the library to uncover the treasure and escape.",
      },
      {
        name: "Escape Office",
        briefDescription: "You are a corporate spy who has been locked in an office and must solve puzzles to retrieve important documents before time runs out.",
        mainDescription: "You're a corporate spy who has been hired to steal important documents from a rival company's office. However, when the doors lock behind you, you realize that you're trapped and must solve the puzzles to retrieve the documents and escape before time runs out.",
      },
      {
        name: "Escape Tavern",
        briefDescription: "You are a pirate who has been locked in a tavern and must solve puzzles to find your treasure map before time runs out.",
        mainDescription: "You're a notorious pirate who has hidden your treasure map in a secret location within a tavern. However, when the doors lock behind you, you realize that you've been double-crossed and must solve the puzzles to find the map and escape before time runs out.",
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
