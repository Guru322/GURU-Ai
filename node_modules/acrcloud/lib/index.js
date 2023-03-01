"use strict";
/// <reference types="./" />
exports.__esModule = true;
var fetch = require("node-fetch");
var FormData = require("form-data");
var crypto = require("crypto");
var acr = /** @class */ (function () {
    function acr(config) {
        this.endpoint = "/v1/identify";
        this.signature_version = "1";
        var host = config.host, access_key = config.access_key, access_secret = config.access_secret, data_type = config.data_type, audio_format = config.audio_format, sample_rate = config.sample_rate, audio_channels = config.audio_channels;
        this.host = host || "identify-us-west-2.acrcloud.com";
        this.access_key = access_key;
        this.access_secret = access_secret;
        this.data_type = data_type || "audio";
        // Optional settings
        this.audio_format = audio_format || "";
        this.sample_rate = sample_rate || "";
        this.audio_channels = audio_channels || 2;
    }
    //  Builds a signature string for making API requests
    acr.prototype.buildStringToSign = function (method, uri, accessKey, dataType, signatureVersion, timestamp) {
        return [method, uri, accessKey, dataType, signatureVersion, timestamp].join("\n");
    };
    //  Signs a signature string
    acr.prototype.sign = function (string, access_secret) {
        return crypto
            .createHmac("sha1", access_secret)
            .update(Buffer.from(string, "utf-8"))
            .digest()
            .toString("base64");
    };
    //  Generates form data from an object
    acr.prototype.generateFormData = function (object) {
        var form = new FormData();
        Object.keys(object).forEach(function (key) {
            form.append(key, object[key]);
        });
        return form;
    };
    /**
     * Identify an audio track from a file path
     * @param {Buffer} audio_sample A file path to an audio file or a buffer from an audio sample of the audio you want to identify
     * @returns {Promise<ACRCloudResponse>} response JSON from ACRCloud https://www.acrcloud.com/docs/acrcloud/metadata/music/
     */
    acr.prototype.identify = function (audio_sample) {
        var current_date = new Date();
        var timestamp = current_date.getTime() / 1000;
        var stringToSign = this.buildStringToSign("POST", this.endpoint, this.access_key, this.data_type, this.signature_version, timestamp);
        var signature = this.sign(stringToSign, this.access_secret);
        var formData = {
            sample: audio_sample,
            access_key: this.access_key,
            data_type: this.data_type,
            signature_version: this.signature_version,
            signature: signature,
            sample_bytes: audio_sample.length,
            timestamp: timestamp
        };
        return fetch("https://" + this.host + "/" + this.endpoint, {
            method: "POST",
            body: this.generateFormData(formData)
        }).then(function (response) { return response.json(); });
    };
    return acr;
}());
module.exports = acr;
