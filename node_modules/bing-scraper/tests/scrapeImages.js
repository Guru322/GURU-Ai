const bing = require("../");                    /* Imports the package */

bing.getCookies(null, function(err, resp) {     /* Gets cookies */
    bing.imageSearch({                          /* Begins calling image searcher */
        q: "big buck bunny",                    /* Sets query */
        cookieString: resp,                     /* Sets cookie string */
        pageCount: 2                            /* Sets page count to 2*/
    }, function(err, resp) {                    /* Finishes callin, begins callback */
        if (err) {                              /* If there is an error... */
            console.log(err);                   /* log the error*/
        } else {                                /* No error? */
            console.log(resp);                  /* Log response */
        }
    });
});