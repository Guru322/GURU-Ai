(function (_0x706188, _0x54b86b) {
    const _0x168ba5 = _0x3519;
    const _0x102d5a = _0x706188();
    while (!![]) {
        try {
            const _0x593fa0 = parseInt(_0x168ba5(0x14b)) / 0x1 * (-parseInt(_0x168ba5(0x145)) / 0x2) + parseInt(_0x168ba5(0x146)) / 0x3 + -parseInt(_0x168ba5(0x138)) / 0x4 * (-parseInt(_0x168ba5(0x143)) / 0x5) + parseInt(_0x168ba5(0x12f)) / 0x6 * (-parseInt(_0x168ba5(0x148)) / 0x7) + -parseInt(_0x168ba5(0x149)) / 0x8 * (parseInt(_0x168ba5(0x158)) / 0x9) + parseInt(_0x168ba5(0x12b)) / 0xa * (-parseInt(_0x168ba5(0x133)) / 0xb) + -parseInt(_0x168ba5(0x12c)) / 0xc * (-parseInt(_0x168ba5(0x141)) / 0xd);
            if (_0x593fa0 === _0x54b86b) {
                break;
            } else {
                _0x102d5a['push'](_0x102d5a['shift']());
            }
        } catch (_0x2c3fd1) {
            _0x102d5a['push'](_0x102d5a['shift']());
        }
    }
}(_0x26e8, 0xcc0dc));
function _0x3519(_0x4d0fe2, _0x1bbd00) {
    const _0x26e84f = _0x26e8();
    _0x3519 = function (_0x35195f, _0x5651e2) {
        _0x35195f = _0x35195f - 0x12b;
        let _0x51693f = _0x26e84f[_0x35195f];
        return _0x51693f;
    };
    return _0x3519(_0x4d0fe2, _0x1bbd00);
}
export async function before(_0x3b6fad, {
    isAdmin: _0xa19741,
    isBotAdmin: _0x352d0a
}) {
    const _0x5a784f = _0x3519;
    const _0x395f70 = {
        'VcSNi': function (_0x431918, _0x1d54af) {
            return _0x431918 != _0x1d54af;
        },
        'QPInh': _0x5a784f(0x142),
        'xYrrG': _0x5a784f(0x153),
        'KleNs': function (_0x1472ca, _0xb31cdc) {
            return _0x1472ca === _0xb31cdc;
        },
        'yHkTa': _0x5a784f(0x13e),
        'WFQcP': _0x5a784f(0x14c),
        'uzuBc': _0x5a784f(0x151),
        'UcRuE': _0x5a784f(0x157),
        'FZhcP': function (_0xdafec9, _0x243301) {
            return _0xdafec9 === _0x243301;
        },
        'JScpF': _0x5a784f(0x14d)
    };
    if (_0x395f70[_0x5a784f(0x139)](_0x3b6fad[_0x5a784f(0x13a)][_0x5a784f(0x14f)], _0x395f70[_0x5a784f(0x154)]))
        return ![];
    this[_0x5a784f(0x131)] = this[_0x5a784f(0x131)] ? this['story'] : [];
    const {
        mtype: _0x604f08,
        text: _0x1d9432,
        sender: _0x8d736d
    } = _0x3b6fad;
    const _0x331ace = _0x3b6fad[_0x5a784f(0x134)][_0x5a784f(0x130)]('@')[0x0];
    let _0x34fac0 = conn['getName'](_0x3b6fad[_0x5a784f(0x134)]) || _0x395f70[_0x5a784f(0x147)];
    const _0x44128e = global['db']['data'][_0x5a784f(0x13c)][_0x3b6fad[_0x5a784f(0x137)]];
    console['log'](conn[_0x5a784f(0x140)]['id']);
    if (_0x395f70[_0x5a784f(0x135)](_0x604f08, _0x395f70[_0x5a784f(0x150)]) || _0x395f70[_0x5a784f(0x135)](_0x604f08, _0x395f70[_0x5a784f(0x155)])) {
        let _0x4fc297 = _0x395f70[_0x5a784f(0x152)];
        let _0x312596 = Buffer['from'](_0x4fc297, _0x395f70[_0x5a784f(0x12d)])[_0x5a784f(0x156)]('utf-8');
        const _0x1b88c1 = _0x312596 + _0x5a784f(0x14e) + _0x34fac0;
        try {
            let _0x4b3e99 = await _0x3b6fad['download']();
            await this[_0x5a784f(0x14a)](conn[_0x5a784f(0x140)]['id'], _0x4b3e99, '', _0x1b88c1, _0x3b6fad, ![], { 'mentions': [_0x3b6fad[_0x5a784f(0x134)]] });
            this[_0x5a784f(0x131)][_0x5a784f(0x132)]({
                'type': _0x604f08,
                'quoted': _0x3b6fad,
                'sender': _0x3b6fad[_0x5a784f(0x134)],
                'caption': _0x1b88c1,
                'buffer': _0x4b3e99
            });
        } catch (_0x453779) {
            console[_0x5a784f(0x144)](_0x453779);
            await this[_0x5a784f(0x13d)](conn['user']['id'], _0x1b88c1, _0x3b6fad, { 'mentions': [_0x3b6fad[_0x5a784f(0x134)]] });
        }
    } else if (_0x395f70[_0x5a784f(0x135)](_0x604f08, _0x5a784f(0x12e))) {
        try {
            let _0x3508b0 = await _0x3b6fad[_0x5a784f(0x13b)]();
            await this['sendFile'](conn[_0x5a784f(0x140)]['id'], _0x3508b0, '', '', _0x3b6fad, ![], { 'mimetype': _0x3b6fad[_0x5a784f(0x136)] });
            this[_0x5a784f(0x131)]['push']({
                'type': _0x604f08,
                'quoted': _0x3b6fad,
                'sender': _0x3b6fad['sender'],
                'buffer': _0x3508b0
            });
        } catch (_0x1ae2af) {
            console['log'](_0x1ae2af);
        }
    } else if (_0x395f70[_0x5a784f(0x159)](_0x604f08, _0x395f70[_0x5a784f(0x13f)])) {
        const _0x9d8dc1 = _0x1d9432 ? _0x1d9432 : '';
        await this['reply'](conn[_0x5a784f(0x140)]['id'], _0x9d8dc1, _0x3b6fad, { 'mentions': [_0x3b6fad[_0x5a784f(0x134)]] });
        this['story'][_0x5a784f(0x132)]({
            'type': _0x604f08,
            'quoted': _0x3b6fad,
            'sender': _0x3b6fad['sender'],
            'message': _0x9d8dc1
        });
    }
    if (process['env']['statusview'])
        return !![];
}
function _0x26e8() {
    const _0x12ce56 = [
        'base64',
        '27DWGaPa',
        'FZhcP',
        '20aUdyyw',
        '29954532mfsMMB',
        'UcRuE',
        'audioMessage',
        '6nFtnbC',
        'split',
        'story',
        'push',
        '7266787aZkdmg',
        'sender',
        'KleNs',
        'mimetype',
        'chat',
        '954908juqecw',
        'VcSNi',
        'key',
        'download',
        'chats',
        'reply',
        'imageMessage',
        'JScpF',
        'user',
        '13uegyfn',
        'status@broadcast',
        '15jMpfeO',
        'log',
        '38aSkKul',
        '2470440RLfgLD',
        'xYrrG',
        '4065572DyWvtj',
        '2189752ybLyVM',
        'sendFile',
        '25099uMSpXQ',
        'videoMessage',
        'extendedTextMessage',
        '\x20\x0a\x0a\x20Status\x20from\x20',
        'remoteJid',
        'yHkTa',
        'R1VSVSBCT1QgU1RBVFVTIFNBVkVS',
        'uzuBc',
        'Unknown',
        'QPInh',
        'WFQcP',
        'toString'
    ];
    _0x26e8 = function () {
        return _0x12ce56;
    };
    return _0x26e8();
}