const nodemailer = require('nodemailer');

//connect to 
mongo: {
	development: {
		connectionString: 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users'
	},
	production: {
		connectionString: 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users'
	},
},
const mongoose = require('mongoose');
const opts = {
	server: {
		socketOptions: {keepAlive:1}
	}
};

switch(app.get('env')){
	case 'developmet':
	mongoose.connect(credentials.mongo.development.connectionString, opts);
	break;
	case 'production':
	mongoose.connect(credentials.mongo.production.connectionString, opts);
	break;
	default:
	throw new Error('Unknown execution environment:' + app.get('env'));
}

module.exports = {
	cookieSecret: 'your cookie secret goes here',
	gmail: {
		user: 'soundboard73',
		password: 'shompin1',
	}
};
