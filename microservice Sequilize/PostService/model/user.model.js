const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organizationId: { type: String, required: true },
    organizationName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

const User = mongoose.model('User', schema);

module.exports = User;