const media = '/var/www';
const oauth = '/etc/oauth';

module.exports = {
	port: 8080,
	db: 'mongodb://localhost:pipescheme',
	fileUploads: media + '/pipescheme',
    sessionSecret: require(oauth + '/sessionSecret.js'),
    facebook: require(oauth + '/facebookOAuth.js'),
    twitter: require(oauth + '/twitterOAuth.js')
};