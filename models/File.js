
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    fileUrl: {
        type: String,
    },

    tags: {
        type: String,
    },

    email: {
        type: String,
    }
});

require("dotenv").config();

//post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("doc", doc);

        //transpoter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        //send mail
        let info = await transporter.sendMail({
            from: 'Raj',
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>File Uploaded</h2> <br> view now - <a href="${doc.fileUrl}">CLick Here</a>`,

        })

        console.log("Info", info);

    } catch (err) {
        console.error(err);

    }

})

const File = mongoose.model("File", fileSchema);
module.exports = File;

