const bcrypt=require('bcryptjs');
const db=require('../../config/database/db');
const {User,Organization:Org} = require('../../model');

module.exports={
    getById,
    update,
    addOrganization
};


async function addOrganization(req) {
    const org=new Org(req);
    await org.save();
}

async function getById(id) {
    return await User.findById(id);
}


async function update(id,userParam) {
    const user=await User.findById(id);

    // validate
    if(!user) throw 'User not found';
    // if(user.email!==userParam.email&&await User.findOne({email: userParam.email})) {
    //     throw 'Username "'+userParam.username+'" is already taken';
    // }
    const organizationDetails=await Org.findOne({name: userParam.organizationName});
    if(!organizationDetails) {
        throw 'Organization name "'+userParam.organizationName+'" not found in our record';
    }
    // hash password if it was entered
    // if(userParam.password) {
    //     userParam.hash=bcrypt.hashSync(userParam.password,10);
    // }
    Object.assign(user,userParam);

    return await user.save();
}

async function _delete(id) {
    return await User.findByIdAndRemove(id);
}