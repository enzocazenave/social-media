const { model, Schema } = require('mongoose');

const PostSchema = Schema({
    user: {
        type: Object,
        required: true
    },
    title: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
    },
    comments: {
        type: Array,
    },
    usersThatSave: {
        type: Array,
    }
});

module.exports = model('Post', PostSchema);