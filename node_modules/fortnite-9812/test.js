const fortnite = require("./index.js")
/*
client.brStats("Ñoт Tfuе", "ps4")
.then(stats => console.log(stats))
.catch(err => console.error(err))

*//*
fortnite.text({text:"DeFaUlT DaNcE", color: "FFFFFF"})
.then(url => console.log(url))
.catch(err => console.error(err))


console.log(["en", "es", "fr"].includes("fr"))*/

fortnite.brNews("fr")
.then(news => console.log(news))
.catch(err => console.error(err))