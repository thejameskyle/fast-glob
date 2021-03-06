import * as assert from 'assert';

import * as utils from './utils';

describe('Benchmark → Utils', () => {
	const oldProcessHrtime = process.hrtime;
	const oldProcessMemoryUsage = process.memoryUsage;

	before(() => {
		process.hrtime = () => [0, 1e7];
		process.memoryUsage = () => ({ rss: 0, heapTotal: 0, heapUsed: 10 * 1024 * 1024 });
	});

	after(() => {
		process.hrtime = oldProcessHrtime;
		process.memoryUsage = oldProcessMemoryUsage;
	});

	describe('.convertHrtimeToMilliseconds', () => {
		it('should returns milliseconds', () => {
			const hrtime: [number, number] = [0, 1e7];

			const expected: number = 10;

			const actual = utils.convertHrtimeToMilliseconds(hrtime);

			assert.equal(actual, expected);
		});
	});

	describe('.convertBytesToMegaBytes', () => {
		it('should returns megabytes', () => {
			const expected: number = 1;

			const actual = utils.convertBytesToMegaBytes(1e6);

			assert.equal(actual, expected);
		});
	});

	describe('.timeStart', () => {
		it('should returns hrtime', () => {
			const expected: [number, number] = [0, 1e7];

			const actual = utils.timeStart();

			assert.deepEqual(actual, expected);
		});
	});

	describe('.timeEnd', () => {
		it('should returns diff between hrtime\'s', () => {
			const expected: number = 10;

			const actual = utils.timeEnd([0, 1e7]);

			assert.equal(actual, expected);
		});
	});

	describe('.getMemory', () => {
		it('should returns memory usage in megabytes', () => {
			const expected: number = 10;

			const actual = utils.getMemory();

			assert.equal(actual, expected);
		});
	});

	describe('.getMeasures', () => {
		it('should returns measures', () => {
			const expected = '{"matches":1,"time":1,"memory":1}';

			const actual = utils.getMeasures(1, 1, 1);

			assert.equal(actual, expected);
		});
	});

	describe('.getAverageValue', () => {
		it('should returns average value for array', () => {
			const expected = 2;

			const actual = utils.getAverageValue([3, 1, 2]);

			assert.equal(actual, expected);
		});
	});

	describe('.getStdev', () => {
		it('should returns stdev for array', () => {
			const expected = 1;

			const actual = utils.getStdev([1, 2, 3]);

			assert.equal(actual, expected);
		});
	});
});
