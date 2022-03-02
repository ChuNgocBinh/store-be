const express = require('express')
require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose');
const errorHandler = require('./common/errorHandler')
const AuthRouter = require('./module/auth/auth.router');

const app = express()

const main = async()=> {
  await mongoose.connect(`${process.env.SERVER_URI}`);
  console.log('Server conected')

  app.use(express.json());

  app.use('/api/auth', AuthRouter)


  
  app.use(errorHandler)
  app.listen(process.env.PORT, () => {
    console.log(`Conect successfully ${process.env.PORT}`)
  })
}

main()
