const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require('dotenv').config({ path: './config.env' });
require('./configs/passport');

const app = express()

// midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))


// routers
const roleRouter = require('./routes/role.route')
const authRouter = require('./routes/auth.route')

// api router with prefixes and versioning
app.use('/api/role', roleRouter)
app.use('/api/auth', authRouter)

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//   port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})