const got = require("got");
const cheerio = require("cheerio");
const utils = require("./utils")

exports.getCookies = function(opts, cb) {
    if (opts == null) {
        var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0";
        var lang = "en-US,en;q=0.5";
        var ref = "https://www.bing.com/";
    } else {
        if (opts.userAgent) { var ua = opts.userAgent; } else { var ua = ""; }
        if (opts.lang) { var lang = opts.lang; } else { var ua = "en-US,en;q=0.5"; }
        if (opts.referer) { var ref = opts.referer; } else { var ref = "https://www.bing.com/"; }
    }
    got("https://www.bing.com", {
        headers: {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        }
    }).then(function(resp) {
        var co = "";
        for (var c in resp.headers["set-cookie"]) {
            var co = co + resp.headers["set-cookie"][c].split("; ")[0] + "; ";
        }
        cb(null, co);
    }).catch(function(err) {
        cb(err, null);
    });
}

exports.search = function(query, cb) {
    if (Object.prototype.toString.call(query) == "[object Object]") {
        if (!query.q && !query.url) {cb({message: "No query/url defined.",code: "noQuery"}, null);}
        if (query.q) {var q = query.q.toString();} else if (query.url) {var url = query.url;}
        if (query.userAgent) { var ua = query.userAgent; } else { var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"; }
        if (query.lang) { var lang = query.lang; } else { var lang = "en-US,en;q=0.5"; }
        if (query.referer) { var ref = query.referer; } else { var ref = "https://www.bing.com/"; }
        if (query.cookieString) { var cookies = query.cookieString; } else { var cookies = null; }
        if (query.enforceLanguage) { var enforceL = query.enforceLanguage; } else { var enforceL = false; }
        if (query.pageCount) { var pageCount = query.pageCount } else { var pageCount = 1; }
        if (q) {
            var obj = {
                "q": q,
                "userAgent": ua,
                "lang": lang,
                "referer": ref,
                "cookieString": cookies,
                "pageCount": pageCount
            };
        } else {
            var obj = {
                "url": url,
                "userAgent": ua,
                "lang": lang,
                "referer": ref,
                "cookieString": cookies,
                "pageCount": pageCount
            };
        }
    } else {
        var q = query.toString();
        var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0";
        var lang = "en-US,en;q=0.5";
        var ref = "https://www.bing.com/";
        var cookies = null;
        var enforceL = true;
        var pageCount = 1;
        var obj = {
            "q": q,
            "userAgent": ua,
            "lang": lang,
            "referer": ref,
            "cookieString": cookies,
            "pageCount": pageCount
        };
    }
    
    if (enforceL == true && !url) { 
        var url = "https://www.bing.com/search?q=" + encodeURIComponent(q) + "&search=&lf=1&form=QBLH" 
    } else if (!url) { 
        var url = "https://www.bing.com/search?q=" + encodeURIComponent(q) + "&search=&form=QBLH"; 
    }

    if (cookies !== null) {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Cookie": cookies,
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    } else {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    }
    var rObj = {};

    rObj.currHref = url;

    got(url, {headers: hdr}).then(async function(resp) {
        var $ = cheerio.load(resp.body);
        
        // web result scraping
        rObj.results = [];
        for (var c in $("#b_results .b_algo")) {
            if (
                $("#b_results .b_algo h2 a")[c] == undefined || 
                $("#b_results .b_algo h2 a")[c].children == undefined || 
                $("#b_results .b_algo h2 a")[c].children[0] == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == undefined ||
                $("#b_results .b_algo h2 a")[c].children[0].data == '!DOCTYPE html ""'
            ) {continue;}
            var resultTitle = utils.normalizeText($("#b_results .b_algo h2 a")[c].children);
            var resultLink = $("#b_results .b_algo h2 a")[c].attribs.href;
            if ($("#b_results .b_algo .b_caption p")[c] !== undefined && $("#b_results .b_algo .b_caption p")[c].children !== undefined) {
                var desc = utils.normalizeText($("#b_results .b_algo .b_caption p")[c].children);
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

        if (
            $("#sp_requery a")[0] &&
            $("#sp_requery a")[0].attribs &&
            $("#sp_requery a")[0].attribs.href &&
            $("#sp_requery a")[0] &&
            $("#sp_requery a")[0].children &&
            utils.normalizeText($("#sp_requery a")[0].children)
        ) {
            rObj.didyoumean = {
                "href": "https://www.bing.com" + $("#sp_requery a")[0].attribs.href,
                "query": utils.normalizeText($("#sp_requery a")[0].children)
            };
        } else {
            rObj.didyoumean = null;
        }

        // suggested search results
        rObj.suggestedQueries = [];
        for (var c in $(".ent-dtab-btn")) {
            if (
                $(".ent-dtab-btn")[c] == undefined ||
                $(".ent-dtab-btn")[c].attribs == undefined ||
                $(".ent-dtab-btn")[c].attribs.href == undefined || 
                $(".ent-dtab-btn")[c].children == undefined ||
                $(".ent-dtab-btn")[c].children[0] == undefined ||
                utils.normalizeText($(".ent-dtab-btn")[c].children) == "" ||
                utils.normalizeText($(".ent-dtab-btn")[c].children) == " "
            ) {continue;}
            var l = "https://www.bing.com" + $(".ent-dtab-btn")[c].attribs.href;
            var n = utils.normalizeText($(".ent-dtab-btn")[c].children);
            rObj.suggestedQueries.push({
                "url": l,
                "query": n
            });
        }

        // carousel scraping
        if ($(".carousel-content")[0]) {
            if (
                $(".carousel-content .carousel-title h2 a")[0]
            ) {
                rObj.carousel = {};
                var ct = utils.normalizeText($(".carousel-content .carousel-title h2 a")[0].children);
                rObj.carousel.title = ct;
                rObj.carousel.cards = [];
                for (var c in $(".carousel-content .items .item .card")) {
                    if (
                        $(".carousel-content .items .item .card .horInfo .tit strong")[c] == undefined || 
                        $(".carousel-content .items .item .card .horInfo .tit strong")[c].children == undefined ||
                        $(".carousel-content .items .item .card .horInfo .tit strong")[c].children[0] == undefined ||
                        utils.normalizeText($(".carousel-content .items .item .card .horInfo .tit strong")[c].children) == "" ||
                        $(".carousel-content .items .item .card a")[c] == undefined ||
                        $(".carousel-content .items .item .card a")[c].attribs == undefined ||
                        $(".carousel-content .items .item .card a")[c].attribs.href == undefined ||
                        $(".carousel-content .items .item .card .horImg .cico img")[c] == undefined ||
                        $(".carousel-content .items .item .card .horImg .cico img")[c].attribs == undefined ||
                        $(".carousel-content .items .item .card .horImg .cico img")[c].attribs.src == undefined
                    ) {continue;}
                    var cardTit = utils.normalizeText($(".carousel-content .items .item .card .horInfo .tit strong")[c].children);
                    var cardUrl = "https://www.bing.com" + $(".carousel-content .items .item .card a")[c].attribs.href;
                    var cardImg = "https://www.bing.com" + $(".carousel-content .items .item .card .horImg .cico img")[c].attribs.src;
                    var card = {
                        "content": cardTit,
                        "image": cardImg,
                        "url": cardUrl
                    };
                    rObj.carousel.cards.push(card);
                }
            }
        } else {
            rObj.carousel = null;
        }

        // music video main result scraping 
        if (
            $(".entityHeroVideo .b_videocard")[0] !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container")[0] !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container h3")[0] !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container h3")[0].children !== undefined &&
            utils.normalizeText($(".entityHeroVideo .b_videocard .video_metadata_container h3")[0].children) !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container .video_summary")[0] !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container .video_summary")[0].children !== undefined &&
            utils.normalizeText($(".entityHeroVideo .b_videocard .video_metadata_container .video_summary")[0].children) !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container .sav-ctrl__link")[0] !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container .sav-ctrl__link")[0].attribs !== undefined &&
            $(".entityHeroVideo .b_videocard .video_metadata_container .sav-ctrl__link")[0].attribs["data-itemmeta"] !== undefined
        ) {
            var d = JSON.parse($(".entityHeroVideo .b_videocard .video_metadata_container .sav-ctrl__link")[0].attribs["data-itemmeta"]);
            if (d.videos[0].murl) {var u = d.videos[0].murl;} else if (d.videos[0].purl) {var u = d.videos[0].purl;} else {var u = null;}
            var m = {
                "title": utils.normalizeText($(".entityHeroVideo .b_videocard .video_metadata_container h3")[0].children),
                "meta": utils.normalizeText($(".entityHeroVideo .b_videocard .video_metadata_container .video_summary")[0].children),
                "url": u
            }
            rObj.videoObject = m;
        } else {
            rObj.videoObject = null;
        }

        // sidebar scraping
        if (
            $(".b_entityTP")[0] &&
            $(".b_entityTP .b_entityTitle")[0] !== undefined &&
            $(".b_entityTP .b_entityTitle")[0].children !== undefined &&
            $(".b_entityTP .b_entityTitle")[0].children[0] !== undefined &&
            $(".b_entityTP .b_entitySubTitle")[0] !== undefined &&
            $(".b_entityTP .b_entitySubTitle")[0].children !== undefined &&
            $(".b_entityTP .b_entitySubTitle")[0].children[0] !== undefined
        ) {
            // general metadata scraping
            rObj.sidebar = {}
            rObj.sidebar.title = utils.normalizeText($(".b_entityTP .b_entityTitle")[0].children);
            rObj.sidebar.subtitle = utils.normalizeText($(".b_entityTP .b_entitySubTitle")[0].children);
            if (
                $(".b_entityTP .b_snippet div .b_hide span")[0] &&
                $(".b_entityTP .b_snippet div .b_hide span")[0].children !== undefined &&
                utils.normalizeText($(".b_entityTP .b_snippet div .b_hide span")[0].children) !== ""
            ) {
                rObj.sidebar.snippet = utils.normalizeText($(".b_entityTP .b_snippet div .b_hide span")[0].children);
            } else if (
                $(".b_entityTP .b_snippet div span")[0] &&
                $(".b_entityTP .b_snippet div span")[0].children !== undefined &&
                $(".b_entityTP .b_snippet div span")[0].attribs !== undefined &&
                $(".b_entityTP .b_snippet div span")[0].attribs["data-translation"] !== undefined &&
                utils.normalizeText($(".b_entityTP .b_snippet div span")[0].children) !== ""
            ) {
                rObj.sidebar.snippet = utils.normalizeText($(".b_entityTP .b_snippet div span")[0].children);
            } else {
                rObj.sidebar.snippet = null;
            }
            if (
                $(".b_entityTP .b_sideBleed .rms_img")[0] == undefined ||
                $(".b_entityTP .b_sideBleed .rms_img")[0].attribs == undefined ||
                $(".b_entityTP .b_sideBleed .rms_img")[0].attribs["data-src-hq"] == undefined
            ) {
                rObj.sidebar.image = null;
            } else {
                rObj.sidebar.image = "https://www.bing.com" + $(".b_entityTP .b_sideBleed .rms_img")[0].attribs["data-src-hq"];
            }

            // footnote scraping
            rObj.sidebar.footnotes = [];
            for (var c in $(".b_entityTP .b_footnote")) {
                if (
                    $(".b_entityTP .b_suppModule .b_footnote")[c] == undefined ||
                    $(".b_entityTP .b_suppModule .b_footnote")[c].children == undefined ||
                    $(".b_entityTP .b_suppModule .b_footnote a")[c] == undefined ||
                    $(".b_entityTP .b_suppModule .b_footnote a")[c].attribs == undefined ||
                    $(".b_entityTP .b_suppModule .b_footnote a")[c].attribs.href == undefined ||
                    $(".b_entityTP .b_suppModule .b_footnote a")[c].attribs.id == "epf" 
                ) {continue;} else {
                    var fnCo = utils.normalizeText($(".b_entityTP .b_suppModule .b_footnote")[c].children);
                    var fnLi = $(".b_entityTP .b_suppModule .b_footnote a")[c].attribs.href;
                    var fn = {
                        "content": fnCo,
                        "url": fnLi
                    };
                    rObj.sidebar.footnotes.push(fn);
                }
            }
        } else {
            rObj.sidebar = null;
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

        // top answer scraping
        if (
            $("#b_results .b_ans .b_tppFact .b_imagePair")[0] !== undefined &&
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusTextLarge")[0] !== undefined &&
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusTextLarge")[0].children !== undefined &&
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusLabel")[0] !== undefined &&
            $("#b_results .b_top .b_tppFact .b_imagePair .b_focusLabel")[0].children !== undefined
        ) {
            var answer = utils.normalizeText($("#b_results .b_top .b_tppFact .b_imagePair .b_focusTextLarge")[0].children);
            var ansTit = utils.normalizeText($("#b_results .b_top .b_tppFact .b_imagePair .b_focusLabel")[0].children);
            if (
                $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0] !== undefined || 
                $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0].attribs["data-src-hq"] !== undefined
            ) {
                var src = "https://www.bing.com" + $("#b_results .b_top .b_tppFact .b_imagePair .cico img")[0].attribs["data-src-hq"]
            } else {var src = null;}
            rObj.topAnswer = { answer: answer, title: ansTit, image: src };
        } else {
            rObj.topAnswer = null;
        }

        // qna answer scraping
        if (
            $("#b_results .b_ans .qna-mf")[0] !== undefined &&
            $("#b_results .b_ans .qna-mf .b_vPanel .rwrl")[0] !== undefined &&
            $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0] !== undefined &&
            $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].children !== undefined &&
            $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].children[0] !== undefined
        ) {
            var answer = utils.normalizeText($("#b_results .b_ans .qna-mf .b_vPanel .rwrl")[0].children);
            var ansSrcTit = utils.normalizeText($("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].children);
            var ansSrcLnk = $("#b_results .b_ans .qna-mf .b_vPanel .qna_algo a")[0].attribs.href;
            rObj.qnaAnswer = { answer: answer, source: { title: ansSrcTit, url: ansSrcLnk } }
        } else {
            rObj.qnaAnswer = null;
        }

        // more web scraping, if requested
        if (pageCount == 1) {cb(false, rObj);} 
        else if (
            rObj.nextPage !== null && rObj.nextHref !== undefined
        ) {
            if (query.url) {var wurl = true;} else {var wurl = false;}
            pageCount = pageCount - 1;
            var nObj = {
                link: rObj.nextHref,
                obj: obj,
                p: pageCount,
                cb: cb,
                responseObject: rObj,
                wasUrl: wurl
            }
            repeatUntilZero(nObj);
        } else {
            cb(false, rObj);
        }
    }).catch(function(err) {
        cb(err, null);
    })
}

exports.imageSearch = function(query, cb) {
    if (Object.prototype.toString.call(query) == "[object Object]") {
        if (!query.q && !query.url) {cb({message: "No query/url defined.",code: "noQuery"}, null);}
        if (query.q) {var q = query.q.toString();} else if (query.url) {var url = query.url;}
        if (query.userAgent) { var ua = query.userAgent; } else { var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"; }
        if (query.lang) { var lang = query.lang; } else { var lang = "en-US,en;q=0.5"; }
        if (query.referer) { var ref = query.referer; } else { var ref = "https://www.bing.com/"; }
        if (query.cookieString) { var cookies = query.cookieString; } else { var cookies = null; }
        if (query.pageCount) { var pageCount = query.pageCount } else { var pageCount = 1; }
        if (q) {
            var obj = {
                "q": q,
                "userAgent": ua,
                "lang": lang,
                "referer": ref,
                "cookieString": cookies,
                "pageCount": pageCount
            };
        } else {
            var obj = {
                "url": url,
                "userAgent": ua,
                "lang": lang,
                "referer": ref,
                "cookieString": cookies,
                "pageCount": pageCount
            };
        }
    } else {
        var q = query.toString();
        var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0";
        var lang = "en-US,en;q=0.5";
        var ref = "https://www.bing.com/";
        var cookies = null;
        var pageCount = 1;
        var obj = {
            "q": q,
            "userAgent": ua,
            "lang": lang,
            "referer": ref,
            "cookieString": cookies,
            "pageCount": pageCount
        };
    }

    if (cookies !== null) {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Cookie": cookies,
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    } else {
        var hdr = {
            "Host": "www.bing.com",
            "User-Agent": ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": lang,
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": ref,
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-GPC": "1",
            "Cache-Control": "max-age=0",
            "TE": "Trailers"
        };
    }

    if (!obj.url) {
        var u = "https://www.bing.com/images/search?q=" + encodeURIComponent(q);
    } else {
        var u = obj.url;
    }

    got(u, {headers: hdr}).then(function(resp) {
        var $ = cheerio.load(resp.body);
        var rObj = {};
        rObj.results = [];

        // image scraping
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

        // did you mean
        if (
            $(".mmrq2 a")[0] &&
            $(".mmrq2 a")[0].attribs &&
            $(".mmrq2 a")[0].attribs.href &&
            $(".mmrq2 a")[0] &&
            $(".mmrq2 a")[0].children &&
            utils.normalizeText($(".mmrq2 a")[0].children)
        ) {
            rObj.didyoumean = {
                "href": "https://www.bing.com" + $(".mmrq2  a")[0].attribs.href,
                "query": utils.normalizeText($(".mmrq2 a")[0].children)
            };
        } else {
            rObj.didyoumean = null;
        }

        // next href url
        if (
            $(".dg_b .dgControl")[0] !== undefined &&
            $(".dg_b .dgControl")[0].attribs !== undefined &&
            $(".dg_b .dgControl")[0].attribs["data-nexturl"] !== undefined 
        ) {
            rObj.nextUrl = "https://www.bing.com" + $(".dg_b .dgControl")[0].attribs["data-nexturl"];
        } else {
            rObj.nextUrl = null;
        }

        if (pageCount == 1) {cb(false, rObj);} 
        else if (
            rObj.nextHref !== null && rObj.nextHref !== undefined
        ) {
            if (query.url) {var wurl = true;} else {var wurl = false;}
            pageCount = pageCount - 1;
            var nObj = {
                link: rObj.nextHref,
                obj: obj,
                p: pageCount,
                cb: cb,
                responseObject: rObj,
                wasUrl: wurl
            }
            repeatUntilZeroImg(nObj);
        } else {
            cb(false, rObj);
        }
    }).catch(function(err) {
        cb(err, null);
    })
}

exports.suggest = function(query, cb) {
    var hdr = {
        "Host": "www.bing.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-GPC": "1",
        "Cache-Control": "max-age=0",
        "TE": "Trailers"
    };

    var u = "https://www.bing.com/AS/Suggestions?pt=page.serp&bq=" + query + "&mkt=en-us&qry=" + query + "%20&cp=7&cvid=3C3CDFF3CD3444558180F5CD3AD41B55";
    got(u, {headers: hdr}).then(function(resp) {
        var $ = cheerio.load(resp.body);
        var s = [];
        for (var c in $("#sa_ul li .sa_tm_text")) {
            if (
                $("#sa_ul li .sa_tm_text")[c] !== undefined &&
                $("#sa_ul li .sa_tm_text")[c].children !== undefined &&
                $("#sa_ul li .sa_tm_text")[c].children[0] !== undefined &&
                utils.normalizeText($("#sa_ul li .sa_tm_text")[c].children) !== ""
            ) {
                s.push(utils.normalizeText($("#sa_ul li .sa_tm_text")[c].children));
            }
        }
        cb(null, s);
    }).catch(function(err) {
        cb(err, null);
    });
}

function repeatUntilZero(nObj) {
    var link = nObj.link;
    var obj = nObj.obj;
    var pageCount = nObj.p;
    var rObj = nObj.responseObject;
    var cb = nObj.cb;
    utils.moreResults(link, obj, function(err, resp) {
        if (err) {
            console.log(err);
            rObj.prevHref = link;
            rObj.nextPageError = err;
            cb(false, rObj);
        } else {
            for (var c in resp.results) {rObj.results.push(resp.results[c]);}
            if (nObj.wasUrl) {rObj.prevHref = resp.prevHref;}
            rObj.currHref = resp.currHref;
            rObj.nextHref = resp.nextHref;
            rObj.results = utils.removeDuplicates(rObj.results, "url");
            var newObj = nObj;
            newObj.p = (pageCount - 1);
            if (pageCount !== 0) {
                setTimeout(function(){
                    repeatUntilZero(newObj);
                }, 500)
            }
            else {cb(false, rObj);}
        }
    });
}

function repeatUntilZeroImg(nObj) {
    var link = nObj.link;
    var obj = nObj.obj;
    var pageCount = nObj.p;
    var rObj = nObj.responseObject;
    var cb = nObj.cb;
    utils.moreImageResults(link, obj, function(err, resp) {
        if (err) {
            rObj.prevHref = link;
            rObj.nextPageError = err;
            cb(false, rObj);
        } else {
            for (var c in resp.results) {rObj.results.push(resp.results[c]);}
            rObj.currHref = resp.currHref;
            rObj.nextHref = resp.nextHref;
            rObj.results = utils.removeDuplicates(rObj.results, "direct");
            var newObj = nObj;
            newObj.p = (pageCount - 1);
            if (pageCount !== 0) {
                setTimeout(function(){
                    repeatUntilZeroImg(newObj);
                }, 500)
            }
            else {cb(false, rObj);}
        }
    });
}