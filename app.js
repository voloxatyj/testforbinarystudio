const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

dotenv.config({path: './config.env'})  

const app = express()
app.use(bodyParser.json())
app.use(cors())
// Dev logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Profile routes
app.use(require('./routes/profile'));

// Handle production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(__dirname + '/public/'));
	
	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running in ${port}`))