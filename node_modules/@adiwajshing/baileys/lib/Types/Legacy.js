"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAFlag = exports.WAMetric = void 0;
/** used for binary messages */
var WAMetric;
(function (WAMetric) {
    WAMetric[WAMetric["debugLog"] = 1] = "debugLog";
    WAMetric[WAMetric["queryResume"] = 2] = "queryResume";
    WAMetric[WAMetric["liveLocation"] = 3] = "liveLocation";
    WAMetric[WAMetric["queryMedia"] = 4] = "queryMedia";
    WAMetric[WAMetric["queryChat"] = 5] = "queryChat";
    WAMetric[WAMetric["queryContact"] = 6] = "queryContact";
    WAMetric[WAMetric["queryMessages"] = 7] = "queryMessages";
    WAMetric[WAMetric["presence"] = 8] = "presence";
    WAMetric[WAMetric["presenceSubscribe"] = 9] = "presenceSubscribe";
    WAMetric[WAMetric["group"] = 10] = "group";
    WAMetric[WAMetric["read"] = 11] = "read";
    WAMetric[WAMetric["chat"] = 12] = "chat";
    WAMetric[WAMetric["received"] = 13] = "received";
    WAMetric[WAMetric["picture"] = 14] = "picture";
    WAMetric[WAMetric["status"] = 15] = "status";
    WAMetric[WAMetric["message"] = 16] = "message";
    WAMetric[WAMetric["queryActions"] = 17] = "queryActions";
    WAMetric[WAMetric["block"] = 18] = "block";
    WAMetric[WAMetric["queryGroup"] = 19] = "queryGroup";
    WAMetric[WAMetric["queryPreview"] = 20] = "queryPreview";
    WAMetric[WAMetric["queryEmoji"] = 21] = "queryEmoji";
    WAMetric[WAMetric["queryRead"] = 22] = "queryRead";
    WAMetric[WAMetric["queryVCard"] = 29] = "queryVCard";
    WAMetric[WAMetric["queryStatus"] = 30] = "queryStatus";
    WAMetric[WAMetric["queryStatusUpdate"] = 31] = "queryStatusUpdate";
    WAMetric[WAMetric["queryLiveLocation"] = 33] = "queryLiveLocation";
    WAMetric[WAMetric["queryLabel"] = 36] = "queryLabel";
    WAMetric[WAMetric["queryQuickReply"] = 39] = "queryQuickReply";
})(WAMetric = exports.WAMetric || (exports.WAMetric = {}));
/** used for binary messages */
var WAFlag;
(function (WAFlag) {
    WAFlag[WAFlag["available"] = 160] = "available";
    WAFlag[WAFlag["other"] = 136] = "other";
    WAFlag[WAFlag["ignore"] = 128] = "ignore";
    WAFlag[WAFlag["acknowledge"] = 64] = "acknowledge";
    WAFlag[WAFlag["unavailable"] = 16] = "unavailable";
    WAFlag[WAFlag["expires"] = 8] = "expires";
    WAFlag[WAFlag["composing"] = 4] = "composing";
    WAFlag[WAFlag["recording"] = 4] = "recording";
    WAFlag[WAFlag["paused"] = 4] = "paused";
})(WAFlag = exports.WAFlag || (exports.WAFlag = {}));
