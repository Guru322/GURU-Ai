/* eslint-disable no-undef */
import { expect } from 'chai';
import { didyoumean } from './index.js';
describe('Tools', () => {
    it('did you mean?', done => {
        const [res1, res2] = didyoumean('test', ['test', 'test2', 'lmao']);
        expect(res1.score).eq(1);
        expect(res2.score).eq(0.8);
        return done();
    });
});
//# sourceMappingURL=test.js.map