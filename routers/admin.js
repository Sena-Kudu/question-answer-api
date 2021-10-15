const express = require("express");
const {getAccessToRoute,getAdminAccess} = require('../middlewares/authorization/auth');
const {blockUser,deleteUser} =require('../controllers/admin');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.use([getAccessToRoute,getAdminAccess]);

router.get('/blockUser/:id',checkUserExist, blockUser);
router.delete('/deleteUser/:id',checkUserExist, deleteUser);
//Block User
//Delete User

module.exports = router;