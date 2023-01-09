const {db}=require('../config/config');
const mongoose=require('mongoose');
const connectionOptions={useCreateIndex: true,useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false};
mongoose.connect(db.url,connectionOptions);
mongoose.Promise=global.Promise;

// module.exports={
//     User: require('../../model/user.model'),
//     Organization: require('../../model/organization.model'),
// };