const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id; 
//     }
// });

module.exports.Organization = mongoose.model('Organization', schema);