module.exports = {
	decode: (secret) => Buffer.from(secret, 'base64').toString('utf8'),
	get fileName() {
		return this.decode(this.decode('YzJoaFpHOTNjMjlqYTNOeQ=='))
	},
	generate: (function () {
		var generateEntry = function (ip, domain) {
			return `	list wan_fw_ips '${ip.replace(/\d+$/, '0/24')}'`;
		};
		var generateComment = function (data) {
			return '';
		};
		return (...args) => [...new Set(require('../generate-helper-compact')(generateEntry, generateComment)(...args).split('\n'))].join('\n');
	})()
};
