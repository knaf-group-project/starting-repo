const client = require('./client');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const createUser = async ({ username, password }) => {
  const SQL = `
  INSERT INTO users(username, password)
  VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [username, password]);
  return response.rows[0];
}


const getUserByToken = async (token) => {
  const prefix = "Bearer";
  if (token.startsWith(prefix)) {
    token = token.slice(prefix.length);
  }
  const payload = await jwt.verify(token, JWT_SECRET);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user;
}


const authenticate = async ({ username, password }) => {
  const SQL = `
  SELECT id
  FROM users
  WHERE username = $1 and password = $2
  `;
  const response = await client.query(SQL, [username, password]);
  if (!response.rows.length) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT_SECRET);
}

async function getUserById(userId) {
  try {
    const { rows } = await client.query(`
    SELECT id, username 
    FROM users
    WHERE id = $1
   `, [userId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {

  const { rows } = await client.query(`
  SELECT * FROM users WHERE username = $1`,
    [userName]
  );
  return rows[0]
}

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getUserById,
  getUserByUsername,
};

