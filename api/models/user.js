const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
require('dotenv').load();

const schemaOptions = {
    toObject: {
        virtuals: true
    }
    , toJSON: {
        virtuals: true
    }
};

let userSchema = db.Schema({
    __v: {
        type: Number,
        select: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String
    },
    passhash: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    facebook: {
        type: db.SchemaTypes.Mixed,
        default: { accessToken: "" }
    },
    google: {
        type: db.SchemaTypes.Mixed,
        default: {
            accessToken: "",
            refreshToken: ""
        }
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    preferences: {
        type:Array,
        default: []
    },
    salt: String
}, schemaOptions);

userSchema.virtual('name').get(function () {
    return this.firstName + " " + this.lastName;
});

userSchema.methods.generateJWT = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.passhash);
};

userSchema.statics.findByToken = function (token) {
    let decodedUser = {};
    try {
        decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject("Invalid token");
    }
    if (decodedUser) {
        //console.log(decodedUser._id);
        return this.findOne({ _id: decodedUser._id }).select("-__v");
    } else {
        return Promise.reject("User not found");
    }
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.passhash
    return obj;
}

const User = db.model('User', userSchema);
module.exports = User;
