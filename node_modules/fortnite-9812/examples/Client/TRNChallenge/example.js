const fortnite = require("./../../../index.js")
const client = new fortnite.Client({
    TRN: "<TRN API key if you have one>"
    //fnbrToken: "<fnbr.co API key if you have one>"
})//from now, you can use all the function that require the client

client.TRNChallenge()
.then(Challenge => console.log(Challenge))
.catch(err => console.error(err))