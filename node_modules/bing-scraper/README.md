# bing-scraper
Scrape results from Microsoft Bing for free.

## sample code
```js
const bing = require("bing-scraper");
bing.search({
    q: "sugar pills idkhow",
    enforceLanguage: true  
}, function(err, resp) {
    if (err) {
        console.log(err);
    } else {
        console.log(resp);
    }
})

//[
//  {
//      title: 'I DONT KNOW HOW BUT THEY FOUND ME – Sugar Pills Lyrics | …',
//      url: 'https://genius.com/I-dont-know-how-but-they-found-me-sugar-pills-lyrics',
//      description: '2020-10-23 · Sugar Pills Lyrics: (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh) / I take one to make me feel better / I take two despite...'
//  }
//]
```

*Result shortened for readability reasons.*

## usage

### ``search(query, cb)``

``query`` is required can be either a string or variable. If it isn't an object, the code attempts to make it a string.

``cb`` is also required and is used as a callback.

#### ``query`` object variables

```js
{
    "q": "hello world",
    "userAgent": "browser's user agent",
    "lang": "browser's Accept-Language header",
    "enforceLanguage": false,
    "referer": "browser's referer",
    "pageCount": 1
}
```

``q`` or ``url`` is required in the object.

``q`` is the query of your search, ``url`` is a URL you recieve from either the ``prevHref``, ``currHref`` or ``nextHref`` varibles in the response.

``userAgent`` is the User Agent used to request Bing with. If it is not set, it defaults to ``Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0``.

``lang`` is the ``Accept-Language`` header used. If it is not set, it defaults to ``en-US,en;q=0.5``.

``enforceLanguage`` is what determines the result's language, a ``lang`` is reccomended but not required. This correlates *with* the ``lang`` object. This variable must be either ``true`` or ``false`` and defaults to ``false``.

``referer`` is the ``Referer`` header used to request Bing with. If it isn't set it defaults to ``https://www.bing.com/``.

``pageCount`` is the number of pages the scraper pulls. This variable must be an Interger and defaults to ``1``.

#### result

*Shortened for readability purposes.*

```js
{
  {
   "currHref": "https://www.bing.com/search?q=idkhow%20members&search=&lf=1&form=QBLH",
   "results": [
      {
         "title": "I Dont Know How But They Found Me - Wikipedia",
         "url": "https://en.wikipedia.org/wiki/I_Don%27t_Know_How_But_They_Found_Me#:~:text=%28Redirected%20from%20I%20Don%27t%20Know%20How%20But%20They,and%20bassist%20Dallon%20Weekes%20and%20drummer%20Ryan%20Seaman.",
         "description": "Hey, _srchprty_ I've been looking into iDKHOW and Tellexx. Information is really scarce. Any time I find something that could be relevant, it seems to vanish. And I swear I've seen that white figure before... tellexxcorp WROTE ON JUNE 24, 1996 AT 8:46 PM: In accordance with Section 512(f) of the DMCA, this page has been shut down due to false ..."
      }
   ],
   "didyoumean": null
   "suggestedQueries": [
      {
         "url": "https://www.bing.com/search?q=i+dont+know+how+but+they+found+me+members&filters=dtbk:\"MjExNjEwNDk5IWtnX3Y0X21lbWJlcnMha2dfdjRfbWVtYmVycyEzMTdkM2IxOS03ZjgzLTQ2OGEtODRiYy0zNzZlNGVjZTg2ZGI=\"&FORM=DEPNAV",
         "query": "Members"
      }
   ],
   "carousel": {
      "title": "I Dont Know How But They Found Me - Members",
      "cards": [
         {
            "content": "Dallon Weekes",
            "image": "https://www.bing.com/th?id=AMMS_e4329b0b4c9376319abba997f0c1d2c6&w=60&h=60&c=12&rs=1&qlt=80&cdv=1&rf=Placeholder-Person_60x60.png&pid=16.2",
            "url": "https://www.bing.com/search?q=Dallon+Weekes&filters=ufn%3a%22Dallon+Weekes%22+sid%3a%22449be3c0-84e6-13a9-840d-174cac003f05%22+catguid%3a%22317d3b19-7f83-468a-84bc-376e4ece86db_f9b60a0f%22+segment%3a%22generic.carousel%22+secq%3a%22idkhow+members%22+supwlcar%3a%220%22+segtype%3a%22QXJ0aXN0LFNvY2lhbEFjdGl2ZQ%3d%3d%22+ctype%3a%220%22+mltype%3a%220%22+eltypedim1%3a%22Artist%22&FORM=SNAPCR"
         }
      ]
   },
   "videoObject": null,
   "sidebar": {
      "title": "I Dont Know How But They Found Me",
      "subtitle": "Band",
      "snippet": "I Dont Know How But They Found Me, often shortened to IDKHow, is an American musical duo based in Salt Lake City, Utah and formed in 2016. The band consists of lead vocalist and bassist Dallon Weekes and drummer Ryan Seaman. Before signing with Fearless Records, the duo was described as \"the hottest unsigned band in the world\" on the cover of Rock Sound in March 2018.",
      "image": "https://www.bing.com/th?id=AMMS_6218cbbf8c1439ea84c227e2ad200c35&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1",
      "footnotes": [
         {
            "content": "Data from: Wikipedia",
            "url": "http://en.wikipedia.org/wiki/I_Dont_Know_How_But_They_Found_Me"
         },
         {
            "content": "Wikipedia text under CC-BY-SA license",
            "url": "http://creativecommons.org/licenses/by-sa/3.0/"
         }
      ]
   },
   "prevHref": null,
   "nextHref": "https://www.bing.com/search?q=idkhow+members&search=&lf=1&first=5&FORM=PORE",
   "topAnswer": null,
   "qnaAnswer": {
      "answer": "(Redirected from I Don't Know How But They Found Me) I Dont Know How But They Found Me (stylized in all caps), often shortened to IDKHow (stylized as iDKHOW), is an American musical duo based in Salt Lake City, Utah and formed in 2016. The band consists of lead vocalist and bassist Dallon Weekes and drummer Ryan Seaman.",
      "source": {
         "title": "I Dont Know How But They Found Me - Wikipedia",
         "url": "https://en.wikipedia.org/wiki/I_Don%27t_Know_How_But_They_Found_Me#:~:text=%28Redirected%20from%20I%20Don%27t%20Know%20How%20But%20They,and%20bassist%20Dallon%20Weekes%20and%20drummer%20Ryan%20Seaman."
      }
   }
}
```

[Example Code](tests/scrape.js)

### ``searchImages(query, cb)``

This is essentailly the same as ``search(query, cb)``, except for images.

#### result

*Shortened for readability purposes.*

```json
{
   "results": [
      {
         "thumbnail": "https://tse4.mm.bing.net/th?id=OIP.DZJUvq5klC8wvwYyngEwiAHaEK&pid=15.1",
         "source": "https://structuraltechnologies.com/big_buck_bunny_2008_1/",
         "direct": "https://structuraltechnologies.com/wp-content/uploads/2013/04/big_buck_bunny_2008_1.jpg",
         "description": "buck bunny 2008 videoframe powder player web mplayer tuxarena canto",
         "title": "big_buck_bunny_2008_1 – STRUCTURAL TECHNOLOGIES"
      }
   ],
   "nextHref": "https://www.bing.com/images/async?q=big+buck+bunny&first=134&count=35&cw=1024&ch=768&relp=35&tsc=ImageBasicHover&datsrc=I&layout=RowBased_Landscape&mmasync=1&dgState=x*336_y*1744_h*182_c*1_i*71_r*19",
   "currHref": "https://www.bing.com/images/async?q=big+buck+bunny&first=64&count=35&cw=1024&ch=768&relp=35&tsc=ImageBasicHover&datsrc=I&layout=RowBased_Landscape&relo=2&relr=8&rely=1347&mmasync=1&dgState=x*0_y*0_h*0_c*4_i*36_r*9"
}
```

[Example Code](tests/scrapeImages.js)

### suggest(query, cb)

Same as ``search`` and ``searchImages`` except ``query`` *must* be a string and not an object.

```json
   [
      "idkhow merch",
      "idkhow choke",
      "idkhow members",
      "idkhow choke lyrics",
      "idkhow modern day cain",
      "idkhow ep",
      "idkhow arg",
      "idkhow gif"
   ]
```

[Example Code](tests/scrapeSuggestions.js)

## license

See [License](LICENSE).