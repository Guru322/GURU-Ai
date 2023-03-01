const fortnite = require("./../../index.js")

fortnite.challenge("current")//season of fortnite to lookup <3 to current> or "current"
.then(challenge => console.log(challenge))//expected output: see the file example.json
.catch(err => console.error(err))