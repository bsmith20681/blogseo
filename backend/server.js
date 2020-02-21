const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
//bring routes
const blogRoutes = require('./routes/blog')

// app
const app = express()

//db
mongoose
  .connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('Database 💾 is connected'))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//cors
if(process.env.NODE_ENV === 'development'){
  app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

//routes middlewares
app.use('/api', blogRoutes)


//port
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`The 🖥server is up and running on port ${port}!`)
})
