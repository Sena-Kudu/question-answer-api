const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema =  mongoose.Schema;

const UserSchema = new Schema({

    name : {
        type : String,
        required : [true, "Please enter name"]
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Please try different email"],
        match : [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Enter valid email"
        ]
    },
    role : {
        type : String,
        default : "user",
        enum : ["user","admin"]
    },
    password : {
        type : String,
        minlength : [6, "Please enter password min 6 char"],
        required : [true, "Please enter password"],
        select : false 
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    title : {
        type : String
    },
    about : {
        type : String
    },
    place : {
        type : String
    },
    website : {
        type : String
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    blocked : {
        type : Boolean,
        default : false
    }

});


UserSchema.pre('save', function(next) {
    //Parola Degişmemisse
    if(!is_modified(this.password)) {
        next();
    }
  
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt,(err, hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model("User",UserSchema);