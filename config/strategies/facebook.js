const passport = require('passport');
const url = require('url');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const users = require('../../app/controllers/users.server.controller');

module.exports = function () {
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		profileFields: ['id', 'name', 'displayName', 'emails'],
		passReqToCallback: true
	}, (req, accessToken, refreshToken, profile, done) => {
		const providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;
		console.log(JSON.stringify(profile));

		const providerUserProfile = {
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			//email: profile.emails[0].value,
			provider: 'facebook',
			providerId: profile.id,
			providerData: providerData
		};

		users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};