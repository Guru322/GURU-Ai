const fortnite = require("./../../index.js")
const fs = require("fs")

fortnite.getID("Ñoт Tfuе")//you need to give an username
.then(user => fs.writeFileSync("./example.json", JSON.stringify(user)))
.catch(err => console.error(err))