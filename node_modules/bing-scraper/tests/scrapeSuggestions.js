const bing = require("../index"); 

bing.suggest("idkhow", function(err, resp) {
    if (err) {
        console.log(err);
    } else {
        console.log(resp);
    }
})