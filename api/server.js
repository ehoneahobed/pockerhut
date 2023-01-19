const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();


// connecting to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Database connected and Backend server is running successfully on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})


// add all necessary middlewares
app.use(cors());
app.use(express.json()); // middleware that allows the sending and receiving of json data
