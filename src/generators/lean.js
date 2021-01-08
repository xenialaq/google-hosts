const ip2Range = require('../ip')

module.exports = {
	decode: (secret) => Buffer.from(secret, 'base64').toString('utf8'),
	get fileName() {
		return this.decode(this.decode('YzJoaFpHOTNjMjlqYTNOeQ=='))
	},
	generate: (function () {
		const dict = {}
		var generateEntry = function (ip, domain) {
			const prefix = 16
			const ipRange = ip2Range(ip, 16)
			if (ip === "127.0.0.1" || ipRange.match(/^10\./) || ipRange.match(/^192\.168\./) || ipRange.match(/^172\.((1[6-9])|(2[0-9])|(3[0-1]))\./)) {
				return ''
			}
			if (dict[ipRange]) {
				return ''
			}
			dict[ipRange] = true;
			return `	list wan_fw_ips '${ipRange}/${prefix}'`;
		};
		var generateComment = function (data) {
			return '';
		};
		return (...args) => [...new Set(require('../generate-helper-compact')(generateEntry, generateComment)(...args).split('\n'))].join('\n');
	})()
};
