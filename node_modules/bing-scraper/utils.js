const got = require("got");
const cheerio = require("cheerio");

exports.normalizeText = function(array) {
    if (Object.prototype.toString.call(array) == "[object Array]") {
        var string = "";
        for (var c in array) {
            if (array[c].type == "text") {string = string + array[c].data}
            else if (
                array[c].type == "tag" && 
                array[c].children !== undefined && 
                array[c].children[0] !== undefined &&
                array[c].children[0].type == "text"
            ) {
                for (var d in array[c].children) {
                    if (array[c].children[d].data) {string = string + array[c].children[d].data;} else {continue;}
                }
            }
        }
        return string;
    } else {
        return array;
    }
}

function normalizeText(array) {
    if (Object.prototype.toString.call(array) == "[object Array]") {
        var string = "";
        for (var c in array) {
            if (array[c].type == "text") {string = string + array[c].data}
            else if (
                array[c].type == "tag" && 
                array[c].children !== undefined && 
                array[c].children[0] !== undefined &&
                array[c].children[0].type == "text"
            ) {
                for (var d in array[c].children) {
                    if (array[c].children[d].data) {string = string + array[c].children[d].data;} else {continue;}
                }
            }
        }
        return string;
    } else {
        return array;
    }
}

exports.moreResults = function (href, info, cb) {
    var rObj = { results:[] };
    rObj.currHref = href;

    if (info.cookies !== null) {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": info.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": info.lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": info.ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Cookie": info.cookie,
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    } else {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": info.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": info.lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": info.ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    }

    got(href, {headers: hdr}).then(function(resp) {
        var $ = cheerio.load(resp.body);

        // web result scraping
        for (var c in $("#b_results .b_algo")) {
            if (
                $("#b_results .b_algo h2 a")[c] == undefined || 
                $("#b_results .b_algo h2 a")[c].children == undefined || 
                $("#b_results .b_algo h2 a")[c].children[0] == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == '!DOCTYPE html ""'
            ) {continue;}
            var resultTitle = normalizeText($("#b_results .b_algo h2 a")[c].children);
            var resultLink = $("#b_results .b_algo h2 a")[c].attribs.href;
            if ($("#b_results .b_algo .b_caption p")[c] !== undefined && $("#b_results .b_algo .b_caption p")[c].children !== undefined) {
                var desc = normalizeText($("#b_results .b_algo .b_caption p")[c].children);
            } else {
                var desc = "";
            }
            var result = {
                "title": resultTitle,
                "url": resultLink,
                "description": desc
            };
            rObj.results.push(result);
        }

        // prev page href scraping
        if (
            $(".sb_pagP")[0] !== undefined && 
            $(".sb_pagP")[0].attribs !== undefined &&
            $(".sb_pagP")[0].attribs.href !== undefined
        ) {
            rObj.prevHref = "https://www.bing.com" + $(".sb_pagP")[0].attribs.href;
        } else {
            rObj.prevHref = null;
        }

        // next page href scraping
        if (
            $(".sb_pagN")[0] !== undefined && 
            $(".sb_pagN")[0].attribs !== undefined &&
            $(".sb_pagN")[0].attribs.href !== undefined
        ) {
            rObj.nextHref = "https://www.bing.com" + $(".sb_pagN")[0].attribs.href;
        } else {
            rObj.nextHref = null;
        }

        cb(false, rObj);
    }).catch(function(err) {
        cb(err, null);
    })
}

exports.removeDuplicates = function (arr, prop) {
    var obj = {};
    for ( var i = 0, len = arr.length; i < len; i++ ){
        if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for ( var key in obj ) newArr.push(obj[key]);
    return newArr;
}

exports.moreImageResults = function(href, info, cb) {
    var rObj = { results:[] };
    rObj.currHref = href;

    if (info.cookies !== null) {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": info.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": info.lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": info.ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Cookie": info.cookie,
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    } else {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": info.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": info.lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": info.ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    }

    got(href, {headers:hdr}).then(function(resp) {
        var $ = cheerio.load(resp.body);

        for (var c in $(".dg_b .iusc")) {
            if ($(".dg_b .iusc")[c] !== undefined && $(".dg_b .iusc")[c].attribs !== undefined) {
                if ($(".dg_b .iusc")[c].attribs["m"]) {
                    var j = JSON.parse($(".dg_b .iusc")[c].attribs["m"]);
                    if (j == null) {continue;}
                    var obj = {
                        "thumbnail": j.turl,
                        "source": j.purl,
                        "direct": j.murl,
                        "description": j.desc,
                        "title": j.t
                    };
                    rObj.results.push(obj);
                } else {
                    continue;
                }
            } else {
                continue;
            }
        }

        // next href url
        if (
            $(".dg_b .dgControl")[0] !== undefined &&
            $(".dg_b .dgControl")[0].attribs !== undefined &&
            $(".dg_b .dgControl")[0].attribs["data-nexturl"] !== undefined 
        ) {
            var nextUrl = "https://www.bing.com" + $(".dg_b .dgControl")[0].attribs["data-nexturl"];
        } else {
            var nextUrl = null;
        }

        rObj.nextHref = nextUrl;

        cb(false, rObj);
    }).catch(function(err) {
        cb(err, null);
    });
}