const fortnite = require("./../../index.js")

fortnite.upcoming()
.then(items => console.log(items))
.catch(err => console.error(err))