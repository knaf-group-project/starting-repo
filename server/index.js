const app = require('./app');

const { client } = require('./db');
const { syncAndSeed } = require('./db/seedData')

const init = async()=> {
  try {
    await client.connect();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();



