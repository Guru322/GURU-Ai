const fortnite = require("./../../../index.js")
const client = new fortnite.Client({
    //TRN: "<TRN API key if you have one>", Not required for this example
    fnbrToken: "<FNBR API key if you have one>"
})//from now, you can use all the function that require the client

client.fnbrImage({name: "straw ops", type: "outfit", limit: 10})
.then(search => console.log(search))
.catch(err => console.error(err))