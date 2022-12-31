const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const searchRoutes = require('./routes/search');
const adminController = require('./routes/admin');
const storyRoutes = require('./routes/story');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(searchRoutes);
app.use(userRoutes);

app.use('/admin', adminController);
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
app.use('/story', storyRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({ message: message, data: error.data });
});

mongoose
    .connect(
        'mongodb+srv://database:vbfgrt45%24%25@cluster0.lj6vk.mongodb.net/interwoven?w=majority'
    )
    .then((res) => {
        console.log('Starting system');
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
    });
