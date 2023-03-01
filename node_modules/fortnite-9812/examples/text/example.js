const fortnite = require("./../../index.js")

fortnite.text({text: "this is a test for the fortnite.text method", size: 160, color: "FFFFFF"})// {text: "<text>", size: <number>, color: "<hex color>"}
.then(url => console.log(url))//expected output: http://fortnitefontgenerator.com/img.php?fontsize=160&textcolor=FFFFFF&text=this%20is%20a%20test%20for%20the%20fortnite.text%20method
.catch(err => console.error(err))