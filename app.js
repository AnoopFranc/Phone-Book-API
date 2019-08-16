const express = require('express');
const mongoose = require('mongoose');
//for loading enviornment variables
require('dotenv/config'); 
//initialize the app
const app = express();

//importing routes
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');



//cross-origin resource sharing
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
// for parsing json data and 
// x-www-form-urlencoded data
app.use(express.json());

//app.use(express.urlencoded({extended:true}));

//routes
app.use('/user',userRoutes);
app.use('/',contactRoutes)
// stored in enviornment variable
const port =process.env.PORT || 3000; 
console.log('db is',process.env.DB_CONNECTION)//1234asd

const uri = process.env.DB_CONNECTION
mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
    console.log("DB Connection successful");
    app.listen(port,() => {
      console.log(`Your port is ${port}`);
    });
})
.catch(err => {
  console.log(err);
})
