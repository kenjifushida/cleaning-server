require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const app = express();
const port = 3000;
db();

const requestReader = (req, res, next) => {
	console.log('-------Received Request-------')
	console.log('Path: ', req.hostname)
	console.log('Time: ', new Date())
	console.log('Request Method: ', req.method)
	console.log('Request Body: ', req.body)
    console.log('------------------------------')
	next();
}

app.use(cors());
app.use(express.json());
app.use(requestReader);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});