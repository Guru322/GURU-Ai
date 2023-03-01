const SEGMENT_BITS = 0x7F;
const CONTINUE_BIT = 0x80;
// https://wiki.vg/Protocol
export function writeVarInt(value) {
    let results = Buffer.alloc(0);
    while (true) {
        if ((value & ~SEGMENT_BITS) === 0) {
            // console.debug('writeVarInt value:', value)
            results = Buffer.concat([results, Buffer.from([value])]);
            break;
        }
        const segment = (value & SEGMENT_BITS) | CONTINUE_BIT;
        // console.debug('writeVarInt segmen:', segment)
        results = Buffer.concat([results, Buffer.from([segment])]);
        // Note: >>> means that the sign bit is shifted with the rest of the number rather than being left alone
        value >>>= 7;
    }
    return results;
}
export function readVarInt(buffer) {
    let value = 0;
    let length = 0;
    let currentByte = 0;
    while (true) {
        currentByte = buffer[length];
        value |= (currentByte & SEGMENT_BITS) << (length * 7);
        if ((currentByte & CONTINUE_BIT) === 0)
            break;
        length++;
        if ((length * 7) >= 32)
            throw new Error('VarInt is too big');
    }
    return value;
}
//# sourceMappingURL=minecraft-protocol.js.map