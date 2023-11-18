require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const authRouter = require('./routes/auths');
const usersRouter = require('./routes/users');
const residencesRouter = require('./routes/residences');
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');
const app = express();
const port = 3000;
db();

const requestReader = (request, response, next) => {
	console.log('-------Received Request-------')
	console.log('Path: ', request.hostname)
	console.log('Time: ', new Date())
	console.log('Request Method: ', request.method)
	console.log('Request Body: ', request.body)
    console.log('------------------------------')
	next();
}

app.use(cors());
app.use(express.json());
app.use(requestReader);

// Routes
app.use('/auths/', authRouter);
app.use('/users/', usersRouter);
app.use('/residences/', residencesRouter);
app.use('/bookings/', bookingsRouter);
app.use('/services/', servicesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});