const nodemailer = require('nodemailer');

//connect to 
mongo: {
	development: {
		connectionString: 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users'
	},
	production: {
		connectionString: 'mongodb://mbarker1221:shompin1@ds131698.mlab.com:31698/users'
	},


module.exports = {
	cookieSecret: 'your cookie secret goes here',
	gmail: {
		user: 'soundboard73',
		password: 'shompin1',
	}
};
