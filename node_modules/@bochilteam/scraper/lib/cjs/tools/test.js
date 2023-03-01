"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const chai_1 = require("chai");
const index_js_1 = require("./index.js");
describe('Tools', () => {
    it('did you mean?', done => {
        const [res1, res2] = (0, index_js_1.didyoumean)('test', ['test', 'test2', 'lmao']);
        (0, chai_1.expect)(res1.score).eq(1);
        (0, chai_1.expect)(res2.score).eq(0.8);
        return done();
    });
});
//# sourceMappingURL=test.js.map