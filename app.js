const dotenv = require('dotenv');
dotenv.config({ path: './.env.test' });
const express = require('express');
const app = express();
const routes = require('./routes/api');
const mongoose = require('mongoose');
const response = require('./utils/response');
const {getRedisClient} = require('./redis');

app.use(express.json());

const Redis = getRedisClient();

Redis.set('foo', 'bar').then(() => {
        console.log('Redis client initialized');
    }).catch((err) => {
        console.error('Error initializing Redis:', err);
    });



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to the MongoDB database');
    })
    .catch((err) => {
        console.error('Error connecting to the MongoDB database:', err);
    });

app.use('/api', routes);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        response.errorResponse(res, 'You must login', 401);
    } else {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    console.log('Backend Started...');
});
