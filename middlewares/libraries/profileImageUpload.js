const multer = require('multer');
const path = require('path');
const CustomError = require("../../helpers/error/CustomError");

// Storage //FileFilter

const storage = multer.diskStorage({
    destination: function(req,file,cb) {

        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));

    },
    filename: function(req,file,cb) {
        //file-mimetype jpg/png

        return cb(null, file.originalname)
    }
});


const fileFilter = (req,file,cb) => {

    let allowedMimeTypes = ["image/jpeg","image/jpg","image/gif","image/png"];

    if(!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file",400),false);
    }

    return(null,true);

};

const profileImageUpload = multer({storage,fileFilter}).single('profile');;

module.exports = profileImageUpload;
