const fetch = require("node-fetch")

module.exports.Client = function(object){
    if(!object)return console.error("No details were provided in a json object.")
    //if(object.email)this.email = object.email //maybe for a next version
    //if(object.pass)this.pass = object.pass //maybe for a next version
    if(object.fnbrToken)this.fnbrToken = object.fnbrToken
    /*if(object.lcToken)this.lcToken = object.lcToken
    else this.lcToken = "MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE="//maybe for the next version
    if(object.fnToken)this.fnToken = object.fnToken
    else this.fnToken = "ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ="//maybe for the next version*/
    if(object.TRN)this.TRN = object.TRN
}

module.exports.Client.prototype.fnbrShop = function(){//note: this need a fnbr token provided in the constructor
    return new Promise((Resolve, Reject) => {
       if(!this.fnbrToken)return Reject("You cannot use this method without a fnbr Token, see fortnite#shop for use without token")
       var url = "https://fnbr.co/api/shop" 
       fetch(url, {
           method: "get",
           headers: {
               "x-api-key": this.fnbrToken
           }
       }).then(res => {
           if(res.status == 401)return Reject("The API key is missing or is incorrect.")
           if(res.status == 404)return Reject("the shop can not be retrieved now, try again later")
           res.json()
           .then(json => {
                Resolve(json)
            })
       })
    })
}

module.exports.shop = function(args1){//everyone can use this endpoint without an API key from fnbr.co, the lang can be ["en", "de", "fr", "zh", "it", "ja", "es"]
    return new Promise((resolve, Reject) => {
        if(!args1)var lang = "en"
        else var lang = args1
        //var langs = ["en", "de"]
        if(!lang || !langs.includes(lang)){
            console.error("please select a VALID language the next time. the shop will be retrieved in english now.")
            var lang = "en"
        }
        var url = "https://fortnite-public-api.theapinetwork.com/prod09/store/get?language=" + lang
        fetch(url, {
            method: "get"
        }).then(res => {
            if(res.status == 404)return Reject("the shop can not be retrieved now, try again later")
            res.json()
            .then(json => {
                resolve(json)
            })
        })
    })
}

module.exports.brNews = function(args1){//the lang can be ["en", "de", "fr", "zh", "it", "ja", "es"], everyone can use this endpoint without signed in with a token or else.
    return new Promise((resolve, Reject) => {
        if(!args1)var lang = "en"
        else var lang = args1
        //var langs = ["en", "de", "fr", "zh", "it", "ja", "es"]
        var url = "https://fortnite-public-api.theapinetwork.com/prod09/br_motd/get?language=" + lang
        fetch(url, {
            method: "get",
        }).then(res => {
            if(res.status == 404)return Reject("error: cannot get the news.")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.upcoming = function(){//everyone can use this endpoint but only english is supported
    return new Promise((resolve, Reject) => {
        fetch("https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get", {
            method: "get"
        }).then(res => {
            if(res.status !== 200)return Reject("error: cannot get the upcomings item")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.Client.prototype.fnbrUpcoming = function(){//only use with an API key from fnbr.co
    return new Promise((resolve, reject) => {
        if(!this.fnbrToken)return reject("You cannot use this method without a fnbr Token, see fortnite#upcoming for use without token")
        var url = "https://fnbr.co/api/upcoming" 
        fetch(url, {
            method: "get",
            headers: {
                "x-api-key": this.fnbrToken
            }
        }).then(res => {
            if(res.status == 401)return Reject("The API key is missing or is incorrect.")
            if(res.status == 404)return Reject("Sorry but the service is unavailable")
            res.json()
            .then(json => {
                resolve(json)
            })
        })
    })
}

function getID(username){
    return new Promise((resolve, reject) => {
        var url = encodeURI(`https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${username}`)
        fetch(url, {
            method: "get"
        }).then(res => {
            if(res.status !== 200)return reject("An error occured with the servers.")
            res.json()
            .then(json => {
                if(json.error == true)return reject(json)
                resolve(json)
            })
        })
    })
}

module.exports.getID = getID

module.exports.getStatsId = function(id, platform){
    return new Promise((resolve, reject) => {
        if(platform !== "pc" && platform !== "ps4" && platform !== "xb1")return reject(`The platform is invalid. try: pc, xb1 or ps4, given: ${platform}`)
        var url = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id=${id}&platform=${platform}`
        fetch(url, {
            method: "get"
        }).then(res => {
            if(res.status !== 200)return reject("An error occured with the servers.")
            res.json()
            .then(json => {
                if(json.error == true)return reject(json)
                resolve(json)
            })
        })
    })
}

module.exports.getStatsName = function(username, platform){
    return new Promise((resolve, reject) => {
        getID(username)
        .then(user => {
            if(platform !== "pc" && platform !== "ps4" && platform !== "xb1")return reject(`The platform is invalid. try: pc, xb1 or ps4, given: ${platform}`)
            if(!user.platforms.includes(platform))return reject(`The user does not have ${platform} in his platform list (${user.platforms})`)
            var url = `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats?user_id=${user.uid}&platform=${platform}`
            fetch(url, {
                method: "get"
            }).then(res => {
                if(res.status !== 200)return reject("An error occured with the servers.")
                res.json()
                .then(json => {
                    if(json.error == true)return reject(json)
                    resolve(json)
                })
            })
        }).catch(err => reject(err))
    })
}

module.exports.servers = function(){
    return new Promise((resolve, reject) => {
        fetch("https://fortnite-public-api.theapinetwork.com/prod09/status/fortnite_server_status", {
            method: "get"
        }).then(res => {
            if(res.status !== 200)return reject("API not availlable.")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.Client.prototype.fnbrStats = function(){//only with an API key from fnbr.co
    return new Promise((resolve, reject) => {
        if(!this.fnbrToken) return reject("You have to use a fnbr.co token for this method")
        var url = "https://fnbr.co/api/stats"
        fetch(url, {
            method: "get",
            headers: {"x-api-key": this.fnbrToken}
        }).then(res => {
            if(res.status == 401)return reject("Unauthorized")
            if(res.status !== 200)return reject("An error occured.")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.Client.prototype.fnbrImage = function(object){//only with an API key from fnbr.co
    return new Promise((resolve, reject) => {
        if(!this.fnbrToken)return reject("You have to use a fnbr.co token for this method")
        if(!object)return reject("No parameters were provided")
        if(!object.name)return reject("No search query were provided")
        var args = []
        if(object.name)args.push("search=" + object.name)
        if(object.type)args.push("type=" + object.type)
        if(object.limit)args.push("limit=" + object.limit)
        var opts = args.join("&")
        var url = encodeURI("https://fnbr.co/api/images?" + opts)
        fetch(url, {
            method: "get",
            headers: {"x-api-key": this.fnbrToken}
        }).then(res => {
            if(res.status == 400)return reject("unknown type")
            if(res.status == 401)return reject("unauthorized")
            if(res.status !== 200)return reject("unavaillable")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.Client.prototype.brStats = function(username, platform){//only with an API key from https://fortnitetracker.com/site-api
    return new Promise((resolve, reject) => {
        if(!this.TRN)return reject("You need an API key from https://fortnitetracker.com/site-api to use this method. see fortnite#getStatsName for use without API key")
        if(!username)return reject("Please specify the username and the platform for the request")
        if(!platform)return reject("You need to specify the platform")
        var url = encodeURI(`https://api.fortnitetracker.com/v1/profile/${platform}/${username}`)
        fetch(url, {
            method: "get",
            headers: {
                "TRN-Api-Key": this.TRN
            }
        }).then(res => {
            if(res.status == 401)return reject("Invalid APi key")
            if(res.status == 500)return reject("an error occurred. this is probably with the platform, it can be invalid.")
            if(res.status !== 200)return reject("An error occured")
            res.json()
            .then(json => resolve(json))
        })
    
    })
        
}

module.exports.text = function(object){//generate an image with the word that you want. everyone can use this endpoint
    return new Promise((resolve, reject) => {
        if(!object)return reject("You need to suply an object for generate text")
        if(!object.text)return reject("You need to precise the text to generate")
        var args = []
        if(!object.size || typeof object.size !== "number" || object.size > 1300) args.push("fontsize=" + 200)
        else args.push("fontsize=" + object.size)
        if(!object.color) args.push("textcolor=000000")
        else args.push("textcolor=" + object.color)
        args.push(encodeURI("text=" + object.text.replace(/%/gi, "%25")).replace(/¦/gi, "").replace(/&/gi, "%26").replace(/#/gi, "%23").replace(/\+/gi, "%2B").replace(/°/gi, "%C2%B0"))
        if(args[2] == "text=")return reject("You need to precise the text to generate")

        var url = "http://fortnitefontgenerator.com/img.php?" + args.join("&")
        resolve(url)
    })
}

module.exports.Client.prototype.TRNShop = function(){//only with an API key from https://fortnitetracker.com/site-api
    return new Promise((resolve, reject) => {
        if(!this.TRN)return reject("You need an API key from https://fortnitetracker.com/site-api to use this method. see fortnite#shop for use without API key")
        fetch("https://api.fortnitetracker.com/v1/store", {
            method: "get",
            headers: {
                "TRN-Api-Key": this.TRN
            }
        }).then(res => {
            if(res.status == 401 || res.status == 403)return reject("Unauthorized, the API key can be missing or incorrect. make sure you have enter the correct one in the client constructor")
            if(res.status !== 200)return reject("an unknown error has occured, status: " + res.status)
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.Client.prototype.TRNChallenge = function(){//only with an API key from https://fortnitetracker.com/site-api
    return new Promise((resolve, reject) => {
        if(!this.TRN)return reject("You need an API key from https://fortnitetracker.com/site-api to use this method. see fortnite#challenge for use without API key")
        fetch("https://api.fortnitetracker.com/v1/challenges", {
            method: "get",
            headers: {
                "TRN-Api-Key": this.TRN
            }
        }).then(res => {
            if(res.status == 401)return reject("Unauthorized, the API key can be missing or incorrect. make sure you have enter the correct one in the client constructor")
            if(res.status !== 200)return reject("an unknown error has occured")
            res.json()
            .then(json => resolve(json))
        })
    })
}

module.exports.challenge = function(s){//everyone can use this endpoint and only in english. you have to suply the season for the challenge. it can be "current" or a number between 3 and the latest"
    return new Promise((resolve, reject) => {
        if(!s)return reject("specify a season to get the challenge. it has to be after season 3 and the current season max")
        if(s = "current"){
            fetch("https://fortnite-public-api.theapinetwork.com/prod09/challenges/get?season=current")
            .then(res => res.json())
            .then(json => resolve(json))
        }else{
            if(typeof s ==  "number")var se = s
            else var se = new Number(s) 
            if(se < 3 || se == 0)return reject("You can only retrieve challenge after season 2")
            fetch("https://fortnite-public-api.theapinetwork.com/prod09/challenges/get?season=current")
            .then(res => res.json())
            .then(json => {
                if(se > json.season)return reject("You cannot retrieve data from a season that hasn't started")
                fetch("https://fortnite-public-api.theapinetwork.com/prod09/challenges/get?season=" + se)
                .then(res => res.json())
                .then(json => resolve(json))
            })
        }
    })
}


module.exports.Client.prototype.fnbrGet = function(url){//perform a get request with the fnbr.co api key if you have one
    return new Promise((resolve, reject) => {
        if(!this.fnbrToken)return reject("You have to use a FNBR API key for this method")
        if(!url)return reject("You have to insert a VALID URL in the function")
        fetch(url, {
            method: "get",
            headers: {
               "x-api-key": this.fnbrToken
            }
        }).then(res => {
            if(res.status == 404)return reject(res.status)
            if(res.status == 401)return reject("Unauthorized")
            res.text()
            .then(text => {
                try{
                    var json = JSON.parse(text);
                    resolve(json)
                }catch(e){//it will allways return a value even if it is not json
                    resolve(text)
                }
            })
        }).catch(err => reject(err))
    })
}

module.exports.getItems = function(){//get an array of ALL items in the game.
    return new Promise((resolve) => {
        fetch("https://fortnite-public-api.theapinetwork.com/prod09/items/list", {
            method: "get"
        }).then(res => res.json())
        .then(json => resolve(json))
    })
}