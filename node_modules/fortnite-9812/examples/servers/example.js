const fortnite = require("./../../index.js")

fortnite.servers()
.then(status => console.log(status))
.catch(err => console.error(err))