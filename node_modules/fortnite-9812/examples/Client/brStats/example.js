const fortnite = require("./../../../index.js")
const client = new fortnite.Client({
    TRN: "<TRN API key if you have one>"
    //fnbrToken: "<fnbr.co API key if you have one>"
})//from now, you can use all the function that require the client

client.brStats("Ñoт Tfuе", "ps4")//client.brStats(USERNAME, PLATFORM)
.then(stats => console.log(stats))
.catch(err => console.error(err))