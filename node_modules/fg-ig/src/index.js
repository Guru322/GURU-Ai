const axios = require("axios"), cheerio = require("cheerio"),qs = require('qs')
module.exports = instagramGetUrl = (url_media) =>{
    return new Promise(async (resolve,reject)=>{
        const BASE_URL = "https://sssinstagram.com/pt"
        
        //New Session = Cookies
        const resp = await axios.get(BASE_URL);
        const cookie = resp.headers["set-cookie"]; // get cookie from request
        const session = {
            cookie: `${cookie[0]}; ${cookie[1]}`,
            token: cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "")
        }
        //DATA
        var data = JSON.stringify({
            "link": url_media
        });

        //REQUEST CONFIG
        var config = {
        method: 'post',
        url: `${BASE_URL}/request`,
        headers: { 
            'cookie': session.cookie, 
            'x-xsrf-token': session.token,
            'Content-Type': 'application/json'
        },
        data : data
        };

        //REQUEST
        axios(config).then(function (response) {
            let result = response.data, ig = [];
            if(result.data.type === "GraphSidecar"){
                result.data.items.forEach(item=>{
                    if (item.type === "GraphVideo"){
                        ig.push(item.video.video_url)
                    } else if (item.type === "GraphImage"){
                        ig.push(item.image.photos[item.image.photos.length - 1].url)
                    }
                })
            } else if (result.data.type === "GraphVideo"){
                ig.push(result.data.video.video_url)
            } else if (result.data.type === "GraphImage"){
                ig.push(result.data.image.photos[result.data.image.photos.length - 1].url)
            }
            resolve({
                results_number : ig.length,
                url_list: ig
            })
        })
        .catch(function (error) {
            reject(error)
        });
    })
}