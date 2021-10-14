const express = require("express");
const {register,getUser,login,logout,forgotPassword,resetPassword} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
//const profileImageUpload = require('../middlewares/libraries/profileImageUpload');
//const multer = require('multer');
//const upload = require('../middlewares/libraries/upload');

const router = express.Router();

//api/auth

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);

/*
router.post("/upload", function (req, res) {
    console.log("hello");
    upload(req, res, function (err) {

        console.log("hello");
      if (err instanceof multer.MulterError) {
        console.log(err);
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
      }
  
      // Everything went fine.
    })
  },imageUpload); */

module.exports = router;
