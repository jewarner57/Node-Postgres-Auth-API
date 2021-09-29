require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors());

// routes
app.use('/user', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
})
