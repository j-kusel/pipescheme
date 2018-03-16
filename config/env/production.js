const media = '/var/www';
const auth = '/var/www/pipescheme_keys';

module.exports = {
	port: 8001,
	db: 'mongodb://localhost/accidents',
	media: media,
	fileUploads: media + '/media/pipescheme',
    sessionSecret: require(auth + '/sessionSecret.js'),
    facebook: require(auth + '/facebookOAuth.js'),
    twitter: require(auth + '/twitterOAuth.js'),
    googleKey: require(auth + '/googleAPI.js'),
    accidents: '/var/www/accidents/PHMSA_accidents',
    sslCert: '/etc/letsencrypt/live/pipescheme.com/fullchain.pem',
    sslKey: '/etc/letsencrypt/live/pipescheme.com/privkey.pem'
};
