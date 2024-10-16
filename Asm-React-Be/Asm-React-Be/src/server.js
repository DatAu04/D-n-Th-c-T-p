const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
app.use(
    cors({
        origin: ['http://localhost:5173'],
    }),
);
app.use(morgan('dev'));
app.use(express.json());

// connect db
connectDB();

// routes
app.use('/api/v1', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server is running on port', PORT));
