const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


// localFile uploading handler-------->>>>>>>>>>>>>>>>>>>>>
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from request
        const file = req.files.file;
        console.log("file aa gyi", file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path);

        //add path to be move function 
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful responce
        res.json({
            success: true,
            message: "local file uploaded successfully"
        });

    } catch (err) {

        console.log(err);
        console.log("file not upload")
    }
};



// image uploading handler-------->>>>>>>>>>>>>>>>>>>>>
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.include(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    // async function uploadFileToCloudinary(file, folder, height){
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }

    // if(height){
    //     options.height = height;
    // }
    options.resource_type = "auto";
    console.log("temp file path", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported) {
            return res.status(400).json({
                success: false,
                message: "file formate is not supported"
            })
        }

        //file formate supported
        const responce = await uploadFileToCloudinary(file, "myFolder");
        console.log(responce);

        //create entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: responce.secure_url,
        });

        res.json({
            success: true,
            fileUrl: responce.secure_url,
            message: "image uploaded successfully",
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "error in image uploading",
        })

    }
}


// Video uploading handler-------->>>>>>>>>>>>>>>>>>>>>
exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        // if(file.size > 5){
        //     return res.status(400).json({
        //         success: false,
        //         message: "file size is too large",
        //     })
        // }

        if (!isFileTypeSupported) {
            return res.status(400).json({
                success: false,
                message: "file formate is not supported",
            })
        }

        //file formate supported
        const responce = await uploadFileToCloudinary(file, "Codehelp");
        console.log(responce);

        //create entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: responce.secure_url,
        });

        res.json({
            success: true,
            fileUrl: responce.secure_url,
            message: "video uploaded successfully",
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "error in video uploading",
        })

    }

}


//Reduced image Uploading---------------->>>>>>>>>>>>>>>>> only quality attribute change from image uploading handler 

exports.imageReducerUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported) {
            return res.status(400).json({
                success: false,
                message: "file formate is not supported"
            })
        }

        //file formate supported
        const responce = await uploadFileToCloudinary(file, "Codehelp", 70);
        console.log(responce);

        //create entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: responce.secure_url,
        });

        res.json({
            success: true,
            fileUrl: responce.secure_url,
            message: "image uploaded successfully",
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "error in Reduced image uploading",
        })

    }
}