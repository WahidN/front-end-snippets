const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Snippet'
    }],
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Snippet'
    }],
    is_Admin: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', userSchema);