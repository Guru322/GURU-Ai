const fortnite = require("./../../index.js")

fortnite.getStatsId("126c2c59f45646718a5e0406d83be593", "ps4")//fortnite.getStatsId(USER ID, PLATFORM)
.then(stats => console.log(stats))
.catch(err => console.error(err))