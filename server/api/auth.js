const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const {
  authenticate,
  getUserByToken,
  getUserById,
} = require('../db');



router.use(async (req, res, next) => {
  const prefix = "Bearer";
  const auth = req.header("Authorization");
  
  if(!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next ({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`
    });
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  
  next();
});


router.post('/', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

router.get('/', async(req, res, next)=> {
  console.log(req.headers.authorization)
  try {
    res.send(await getUserByToken(req.headers.authorization)); 
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;