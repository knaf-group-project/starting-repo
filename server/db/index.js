const client = require('./client')

module.exports = {
  client,
  ...require('./User'), 
  ...require('./EscapeRooms'), 
  ...require('./cart'), 
  ...require('./cart_products') 
}