const express = require('express');
const dotenv = require('dotenv');
const UserRoute = require('./Routers/user.Router');
const AuthRoute = require('./Routers/authRouter');
const ProductRouter = require('./Routers/product.Router');
const OrderRouter = require('./Routers/order.Router');
const CartRouter = require('./Routers/cart.Router');

dotenv.config();


const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({extended : false}));


// Routers

app.use('/users',UserRoute);
app.use('/products',ProductRouter);
app.use('/orders',OrderRouter);
app.use('/carts',CartRouter);
app.use(AuthRoute);


module.exports = app;