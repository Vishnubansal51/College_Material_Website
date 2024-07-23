// const express = require('express')
// const bodyparser = require('body-parser')
// const app =  express();
// const cors = require("cors")
// app.use(cors({
//     origin: "https://college-material-website.onrender.com"
// }))
// require('dotenv').config();
// const userRoute =  require('./routes/user')
// const materialRoute =  require('./routes/material')
// const webRouter= require('./routes/webRoutes')


// app.use(bodyparser.json())
// app.use("/user",userRoute)
// app.use('/material',materialRoute);
// app.use('/',webRouter)
// // app.use('/aws', awsRouter)
// // // Serve files from the uploads directory
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// module.exports = app

const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const app = express();

const allowedOrigins = [
    'https://campusfusion.vercel.app',
    'https://college-material-website.onrender.com' 
];

app.use(cors({
    origin: function(origin, callback) {
      
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

const userRoute = require('./routes/user');
const materialRoute = require('./routes/material');
const webRouter = require('./routes/webRoutes');

app.use(bodyparser.json());
app.use("/user", userRoute);
app.use('/material', materialRoute);
app.use('/', webRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
