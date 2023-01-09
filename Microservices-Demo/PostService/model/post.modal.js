const mongoose = require('mongoose');
const {User} = require('./index');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const Post = mongoose.model('Post', schema);

module.exports = Post;