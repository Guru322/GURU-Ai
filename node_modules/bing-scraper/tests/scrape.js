const bing = require("../index"); /* Imports the package */

bing.search({
    q: "idkhow members",        /* Sets query to "idkhow members" */
    enforceLanguage: true       /* Forces the language to be the browser's lanugage, since none is set - it defaults to English only results*/
}, function(err, resp) {        /* Sets up the callback. */
    if (err) {                  /* If there is an error getting the results...*/
        console.log(err);       /* log it into the console.*/
    } else {                    /* If there isn't an error...*/
        console.log(resp);      /* log the results! */
    }
});                             /* End the program. */