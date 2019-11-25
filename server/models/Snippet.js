const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const snippetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Snippet', snippetSchema);