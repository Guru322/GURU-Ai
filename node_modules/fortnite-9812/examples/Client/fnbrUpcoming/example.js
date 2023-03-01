const fortnite = require("./../../../index.js")
const client = new fortnite.Client({
    //TRN: "<TRN API key if you have one>", Not required for this example
    fnbrToken: "<fnbr API key if you have one>"
})//from now, you can use all the function that require the client

client.fnbrUpcoming()
.then(items => console.log(items))
.catch(err => console.error(err))