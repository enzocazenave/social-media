const { model, Schema } = require('mongoose');

const PostSchema = Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
});

module.exports = model('Post', PostSchema);