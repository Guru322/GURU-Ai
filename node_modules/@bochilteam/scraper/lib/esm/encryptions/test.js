/* eslint-disable no-undef */
import { expect } from 'chai';
import { toBase64, fromBase64ToString, randomUUID, randomBytes, createHash, minecraftProtocol } from './index.js';
describe('Encryptions', () => {
    describe('Base64', () => {
        it('From string to base64', done => {
            try {
                const res = toBase64('Hello World!!');
                expect(res).to.be.a('string');
                expect(res).to.be.equal('SGVsbG8gV29ybGQhIQ==');
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
        it('from base64 to string', done => {
            try {
                const res = fromBase64ToString('SGVsbG8gV29ybGQhIQ==');
                expect(res).to.be.a('string');
                expect(res).to.be.equal('Hello World!!');
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
    });
    describe('Crypto', () => {
        it('randomUUID', done => {
            try {
                const res = randomUUID();
                expect(res).to.be.a('string');
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
        it('randomBytes', done => {
            try {
                const res = randomBytes(16);
                expect(res).to.be.a('string');
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
        it('createHash', done => {
            try {
                const res = createHash('sha256', 'Hello world!!');
                expect(res).to.be.a('string');
                expect(res).to.have.length(64);
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
    });
    describe('Minecraft Protocol', () => {
        it('writeVarInt and readVarInt', done => {
            try {
                const value = 1000;
                const encode = minecraftProtocol.writeVarInt(value);
                expect(encode).to.be.instanceOf(Buffer);
                const decode = minecraftProtocol.readVarInt(encode);
                expect(decode).to.be.a('number');
                expect(decode).to.be.equal(value);
                return done();
            }
            catch (e) {
                return done(e);
            }
        });
    });
});
//# sourceMappingURL=test.js.map