const mongoose = require('mongoose');
const crypto = require('crypto');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: /.+\@.+\..+/,
        required: 'Enter a valid email address.'
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: [
            (password) => {
                return password.length >= 6;
            },
            'Password should be at least 8 characters'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto
        .pbkdf2Sync(password, this.salt, 10000, 64)
        .toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
