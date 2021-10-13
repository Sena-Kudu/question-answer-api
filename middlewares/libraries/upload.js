const multer = require('multer');
const path = require('path');
const CustomError = require("../../helpers/error/CustomError");


const storage = multer.diskStorage({
    destination: function(req,file,cb) {

        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));

    },
    filename: function(req,file,cb) {
        //file-mimetype jpg/png

        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension ; 
        cb(null,req.savedProfileImage);
    }
});
var upload = multer({ storage : storage}).single('avatar');


module.exports = upload;