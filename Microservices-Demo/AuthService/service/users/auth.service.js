const { jwtToken } = require('../../config/config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User: UserModel, Organization } = require('../../model');

module.exports = {
	authenticate,
	create,
};

async function authenticate(requestSchema) {
	const { email, password } = requestSchema;
	const user = await UserModel.findOne({ email });
	if (user && bcrypt.compareSync(password, user.password)) {
		delete user.password;
		const token = jwt.sign({ id: user.id }, jwtToken.secretKey, { expiresIn: jwtToken.expiresIn });
		return {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			organizationName: user.organizationName,
			token
		};
	}
}

async function create(userParam) {
	// validate
	if (await UserModel.findOne({ email: userParam.email })) {
		throw 'Email "' + userParam.email + '" is already taken';
	}

	const organizationDetails = await Organization.findOne({ name: userParam.organizationName });
	if (!organizationDetails) {
		throw 'Organization name "' + userParam.organizationName + '" not found in our record';
	}

	userParam.organizationId = organizationDetails._id;
	const user = new UserModel(userParam);

	// hash password
	if (userParam.password) {
		user.password = bcrypt.hashSync(userParam.password, 10);
	}

	// save user
	return await user.save();
}
