const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

// import routers
const userRoute = require('./routes/user');
const productRoutes = require('./routes/product');
const vendorRoutes = require('./routes/vendor');
const blogRoutes = require("./routes/blog");
const categoryRoutes = require("./routes/categories");
const subcategoryRoutes = require("./routes/subcategories");
const categoryQuestionRoutes = require("./routes/categoryQuestion");
const enquiryRoutes = require("./routes/enquiry");
const agroserviceRoutes = require("./routes/agroservice");
const weekendkillsRoutes = require("./routes/weekendkills");
const vetserviceRoutes = require('./routes/vetservice');
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart');
const notificationSettingRoutes = require('./routes/notificationSetting');
const vetsRoutes = require('./routes/vets');
const logisticRoutes = require('./routes/logistic');
const paymentRoutes = require('./routes/payment');
const trackingRoutes = require('./routes/tracking');
const ratingRoutes = require('./routes/rating');
const announcementRoutes = require('./routes/announcement');

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

app.use('/api/user', userRoute);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/categoryquestions', categoryQuestionRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/agroservice', agroserviceRoutes);
app.use('/api/weekendkills', weekendkillsRoutes);
app.use('/api/vetservice', vetserviceRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/notification', notificationSettingRoutes);
app.use('/api/vets', vetsRoutes);
app.use('/api/logistic', logisticRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/announcement', announcementRoutes);