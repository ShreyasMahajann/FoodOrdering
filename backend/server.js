const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds
// Set up CORS
app.use(cors({
  origin: [`${process.env.FRONTEND}`,'http://localhost:3000'], // Your frontend origins
  credentials: true,
}));

// 1) GLOBAL MIDDLEWARES
app.use(routes);
// db connection

let retryCount = 0;

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successful!');
        retryCount = 0; // Reset retry count on successful connection
    })
    .catch((err) => {
        console.error('DB connection failed:', err.message);
        retryConnection();
    });
    }

function retryConnection() {
    if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`Retrying connection... Attempt ${retryCount} of ${MAX_RETRIES}`);
        setTimeout(connectToDB, RETRY_INTERVAL);
    } else {
        console.error('Max retries reached. Unable to connect to the database.');
        process.exit(1);
    }
}

connectToDB();

// Specify the port to listen on
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});