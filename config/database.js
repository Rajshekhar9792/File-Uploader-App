
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL)
        .then(
            console.log("database connection established successfully")
        )
        .catch((error) => {
            console.log("Db connection Issues");
            console.error(error)
            process.exit(1)
        })
}