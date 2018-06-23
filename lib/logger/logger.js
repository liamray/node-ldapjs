const winston = require('winston');

///////////////////////////////////////////////////////////////////////////////////////////////

const clientLog = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.json()
	)
});

clientLog.debug = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return clientLog.level === 'debug';
	}

	args.unshift('debug');
	clientLog.log.apply(this, args);
};

clientLog.trace = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return clientLog.level === 'silly';
	}

	args.unshift('silly');
	clientLog.log.apply(this, args);
};

///////////////////////////////////////////////////////////////////////////////////////////////

const serverLog = winston.createLogger({
	level: 'info',
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.json()
	)
});

serverLog.debug = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return serverLog.level === 'debug';
	}

	args.unshift('debug');
	serverLog.log.apply(this, args);
};

serverLog.trace = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return serverLog.level === 'silly';
	}

	args.unshift('silly');
	serverLog.log.apply(this, args);
};

///////////////////////////////////////////////////////////////////////////////////////////////

const testLog = winston.createLogger({
	level: 'silly',
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.json()
	)
});

testLog.debug = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return testLog.level === 'debug';
	}

	args.unshift('debug');
	testLog.log.apply(this, args);
};

testLog.trace = function () {
	const args = Array.prototype.slice.call(arguments);

	if (args.length < 1) {
		return testLog.level === 'silly';
	}

	args.unshift('silly');
	testLog.log.apply(this, args);
};

///////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	clientLog: clientLog,
	serverLog: serverLog,
	testLog: testLog
};
///////////////////////////////////////////////////////////////////////////////////////////////