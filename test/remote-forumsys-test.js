const ldap = require('../lib/index');
const assert = require('assert');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const server = "ldap.forumsys.com:389";
const adSuffix = "dc=example,dc=com";
const userPrincipalName = "cn=read-only-admin,dc=example,dc=com";
const password = "password";

const searchOptions = {
	scope: "sub",
	filter: '(uid=gauss)',
	attributes: ['userPrincipalName']
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function unbind() {
	client.unbind(err => {
		assert.ifError(err);
	});
}

const result = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const client = ldap.createClient({
	url: `ldap://${server}`
});

client.bind(userPrincipalName, password, err => {
	assert.ifError(err);
});

client.search(adSuffix, searchOptions, (err, res) => {
	assert.ifError(err);
	res.on('searchEntry', entry => {
		result.push(entry.object);
	});
	res.on('searchReference', referral => {
		console.log('referral: ' + referral.uris.join());
	});
	res.on('error', err => {
		console.error('error: ' + err.message);
		unbind();
	});
	res.on('end', res => {
		console.log(result);
		unbind();
	});
});

