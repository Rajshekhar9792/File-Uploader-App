//create the app
const express = require("express");
const app = express();

//find the port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//activate the server
app.listen(PORT, () => {
    console.log(`app is runing at ${PORT}`)
})

//add middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));


//connection with Database
const db = require("./config/database");
db.connect();

//connect with cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mount the api routes
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

