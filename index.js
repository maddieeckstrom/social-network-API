const express = require('express');
const mongoose = require("mongoose");
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/social-network-API")
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err));

    
app.listen(3001, () => console.log('Server connected'));