"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAuthCreds = exports.addTransactionCapability = void 0;
const boom_1 = require("@hapi/boom");
const crypto_1 = require("crypto");
const crypto_2 = require("./crypto");
const generics_1 = require("./generics");
/**
 * Adds DB like transaction capability (https://en.wikipedia.org/wiki/Database_transaction) to the SignalKeyStore,
 * this allows batch read & write operations & improves the performance of the lib
 * @param state the key store to apply this capability to
 * @param logger logger to log events
 * @returns SignalKeyStore with transaction capability
 */
const addTransactionCapability = (state, logger, { maxCommitRetries, delayBetweenTriesMs }) => {
    let inTransaction = false;
    // number of queries made to the DB during the transaction
    // only there for logging purposes
    let dbQueriesInTransaction = 0;
    let transactionCache = {};
    let mutations = {};
    /**
     * prefetches some data and stores in memory,
     * useful if these data points will be used together often
     * */
    const prefetch = async (type, ids) => {
        if (!inTransaction) {
            throw new boom_1.Boom('Cannot prefetch without transaction');
        }
        const dict = transactionCache[type];
        const idsRequiringFetch = dict ? ids.filter(item => !(item in dict)) : ids;
        // only fetch if there are any items to fetch
        if (idsRequiringFetch.length) {
            dbQueriesInTransaction += 1;
            const result = await state.get(type, idsRequiringFetch);
            transactionCache[type] = Object.assign(transactionCache[type] || {}, result);
        }
    };
    return {
        get: async (type, ids) => {
            if (inTransaction) {
                await prefetch(type, ids);
                return ids.reduce((dict, id) => {
                    var _a;
                    const value = (_a = transactionCache[type]) === null || _a === void 0 ? void 0 : _a[id];
                    if (value) {
                        dict[id] = value;
                    }
                    return dict;
                }, {});
            }
            else {
                return state.get(type, ids);
            }
        },
        set: data => {
            if (inTransaction) {
                logger.trace({ types: Object.keys(data) }, 'caching in transaction');
                for (const key in data) {
                    transactionCache[key] = transactionCache[key] || {};
                    Object.assign(transactionCache[key], data[key]);
                    mutations[key] = mutations[key] || {};
                    Object.assign(mutations[key], data[key]);
                }
            }
            else {
                return state.set(data);
            }
        },
        isInTransaction: () => inTransaction,
        prefetch: (type, ids) => {
            logger.trace({ type, ids }, 'prefetching');
            return prefetch(type, ids);
        },
        transaction: async (work) => {
            // if we're already in a transaction,
            // just execute what needs to be executed -- no commit required
            if (inTransaction) {
                await work();
            }
            else {
                logger.trace('entering transaction');
                inTransaction = true;
                try {
                    await work();
                    if (Object.keys(mutations).length) {
                        logger.trace('committing transaction');
                        // retry mechanism to ensure we've some recovery
                        // in case a transaction fails in the first attempt
                        let tries = maxCommitRetries;
                        while (tries) {
                            tries -= 1;
                            try {
                                await state.set(mutations);
                                logger.trace({ dbQueriesInTransaction }, 'committed transaction');
                                break;
                            }
                            catch (error) {
                                logger.warn(`failed to commit ${Object.keys(mutations).length} mutations, tries left=${tries}`);
                                await (0, generics_1.delay)(delayBetweenTriesMs);
                            }
                        }
                    }
                    else {
                        logger.trace('no mutations in transaction');
                    }
                }
                finally {
                    inTransaction = false;
                    transactionCache = {};
                    mutations = {};
                    dbQueriesInTransaction = 0;
                }
            }
        }
    };
};
exports.addTransactionCapability = addTransactionCapability;
const initAuthCreds = () => {
    const identityKey = crypto_2.Curve.generateKeyPair();
    return {
        noiseKey: crypto_2.Curve.generateKeyPair(),
        signedIdentityKey: identityKey,
        signedPreKey: (0, crypto_2.signedKeyPair)(identityKey, 1),
        registrationId: (0, generics_1.generateRegistrationId)(),
        advSecretKey: (0, crypto_1.randomBytes)(32).toString('base64'),
        processedHistoryMessages: [],
        nextPreKeyId: 1,
        firstUnuploadedPreKeyId: 1,
        accountSettings: {
            unarchiveChats: false
        }
    };
};
exports.initAuthCreds = initAuthCreds;
