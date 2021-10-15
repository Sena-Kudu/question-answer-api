const User = require('../Models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');


const blockUser = asyncErrorWrapper(async(req,res,next) => {

    const {id} = req.params;
    const user = await User.findById(id);

    user.blocked = !user.blocked;
    user.save();

    return res.status(200)
    .json({
        success: true,
        message: "Block-Unblocked successfull"
    });

});

const deleteUser = asyncErrorWrapper(async(req,res,next) => {

    const {id} = req.params;
    const user = await User.findById(id);

    user.remove();

    return res.status(200)
    .json({
        success: true,
        message: "Delete Process successful"
    });

});

module.exports = {
    blockUser,
    deleteUser
};