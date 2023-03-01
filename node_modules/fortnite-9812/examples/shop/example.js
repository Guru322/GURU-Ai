const fortnite = require("./../../index.js")
var lang = "en"// it can be one of ["en", "de"]

fortnite.shop(lang)
.then(shop => console.log(shop))
.catch(err => console.error(err))