const fortnite = require("./../../index.js")

fortnite.getStatsName("Ñoт Tfuе", "ps4")//fortnite.getStatsId(USERNAME, PLATFORM)
.then(stats => console.log(stats))
.catch(err => console.error(err))