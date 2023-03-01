
# fortnite-9812

![Title](http://fortnitefontgenerator.com/img.php?fontsize=200&textcolor=000000&text=Fortnite-9812)

A nodejs module for retrieving data from TRN, fnbr.co and https://fortniteapi.com/

## Installation

you can install this module with npm

```bash
npm i fortnite-9812
```

## Documentation

Some of the method use Authentification by a special service like fnbr.co or fortnitetracker.com. Make sure you have the api key for these service if you want to use their service.

### Create a Client
You're not obliged to create a client if you doesn't want to use fnbr.co and fortnitetracker api. Make sure you have insert your credentials in the client.
example:
```js
const fortnite = require("fortnite-9812")
const client = new fortnite.Client({
	TRN: "<TRN API key if you have one>",
	fnbrToken: "<fnbr API key if you have one>"
})//from now, you can use all the function that require the client
```

### Get the fortnite in-game news

there is currently one method to get the news. it's **fortnite#brNews**

example:

```js
const  fortnite  =  require("fortnite-9812")

fortnite.brNews()
.then(news  =>  console.log(news))
.catch(err  =>  console.eror(err))
```

### Get the fortnite in-game shop
There is three method to get the shop, the first uses an API key from [fnbr.co](https://fnbr.co/api/docs), the second uses an APi key from [trackernetwork](https://fortnitetracker.com/site-api)and the last doesn't use any API key.

**FNBR method**
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
//TRN: "<TRN API key if you have one>", Not required for this example
fnbrToken:  "<fnbr API key if you have one>"
})//from now, you can use all the function that require the client

client.fnbrShop()
.then(shop  =>  console.log(shop))
.catch(err  =>  console.error(err))
```
this example retrieve the shop in the format json:
```json
{
  "status": 200,
  "data": {
    "date": "2019-01-12T00:00:00.000Z",
    "featured": [
      //an array with featured items
    ],
    "daily": [
      //an array with daily items
    ]
  }
}
```
**TRN method**
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
TRN: "<TRN API key if you have one>"
//fnbrToken: "<fnbr API key if you have one>" Not required for this example
})//from now, you can use all the function that require the client

client.TRNShop()
.then(shop  =>  console.log(shop))
.catch(err  =>  console.error(err))
```
this example retrieve the shop in the format json:
```json
[
  {
    "imageUrl": "https://cdn.thetrackernetwork.com/cdn/fortnite/7F6A6728_large.png",
    "manifestId": 6728,
    "name": "Virtue",
    "rarity": "Sturdy",
    "storeCategory": "BRWeeklyStorefront",
    "vBucks": 800
  },
  //return an array of all items in the shop
  //to know the store category, see for each entries storeCategory. expected: "BRWeeklyStorefront" or "BRDailyStorefront"
  
]
```

**fortniteapi.com method**
example:
```js
const  fortnite  =  require("fortnite-9812")
var  lang  =  "en"// it can be one of ["en", "de"]

fortnite.shop(lang)
.then(shop  =>  console.log(shop))
.catch(err  =>  console.error(err))
```
example of response:
```json
{
  "date_layout": "day-month-year",
  "lastupdate": 1547251203,
  "language": "en",
  "date": "12-01-19",
  "rows": 10,
  "vbucks": "https://fortnite-public-files.theapinetwork.com/fortnite-vbucks-icon.png",
  "items": [
    //an array with items
  ]
}
```
example of an item: 
```json
{
      "itemid": "eb15c77-d0ac8ec-ca444b0-c61443d",
      "name": "Red-Nosed Raider",
      "cost": "1200",
      "featured": 1,
      "refundable": 1,
      "lastupdate": 1547251203,
      "youtube": "https://www.youtube.com/watch?v=j60G-J8fWiQ",
      "item": {
        "image": "https://fortnite-public-files.theapinetwork.com/outfit/6d2d47c11279d5584da65d66acf74d77.png",
        "images": {
          "transparent": "https://fortnite-public-files.theapinetwork.com/outfit/6d2d47c11279d5584da65d66acf74d77.png",
          "background": "https://fortnite-public-files.theapinetwork.com/image/eb15c77-d0ac8ec-ca444b0-c61443d.png",
          "information": "https://fortnite-public-files.theapinetwork.com/image/eb15c77-d0ac8ec-ca444b0-c61443d/item.png",
          "featured": {
            "transparent": "https://fortnite-public-files.theapinetwork.com/featured/eb15c77-d0ac8ec-ca444b0-c61443d.png"
          }
        },
        "captial": "outfit",
        "type": "outfit",
        "rarity": "rare",
        "obtained_type": "vbucks"
      },
      "ratings": {
        "avgStars": 4.29,
        "totalPoints": 300,
        "numberVotes": 70
      }
    }
```
### Get upcoming items
You can retrieve upcoming items with a fnbr.co API key or without APi key.
**FNBR method**
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
	//TRN: "<TRN API key if you have one>", Not required for this example
	fnbrToken:  "<fnbr API key if you have one>"
})//from now, you can use all the function that require the client

client.fnbrUpcoming()
.then(items  =>  console.log(items))
.catch(err  =>  console.error(err))
```
json response example:
```json
{
  "status": 200,
  "data": [
  //an array with a list of items
    {
      "id": "5c19185a41eb8a88a040b680",
      "name": "Cheer Up",
      "price": "???",
      "priceIcon": false,
      "priceIconLink": false,
      "images": {
        "icon": "https://image.fnbr.co/emote/5c19185a41eb8a88a040b680/icon.png",
        "png": false,
        "gallery": false,
        "featured": false
      },
      "rarity": "epic",
      "type": "emote",
      "slug": "cheer-up",
      "readableType": "Emote",
      "description": "Be aggressive. B-E aggressive.",
      "bundleSet": false
    }
  ]
}
```
**Without APi key**
```js
const  fortnite  =  require("fortnite-9812")

fortnite.upcoming()
.then(items  =>  console.log(items))
.catch(err  =>  console.error(err))
```
json example:
```json
{
  "rows": 7,
  "vbucks": "https://fortnite-public-files.theapinetwork.com/fortnite-vbucks-icon.png",
  "items": [
  //an array of upcoming items
    {
      "itemid": "c1d1255-1e7ff5b-0f08b6a-4032d59",
      "name": "Cheer Up",
      "cost": "???",
      "item": {
        "image": "https://fortnite-public-files.theapinetwork.com/emote/d419d60590ab75882c1fc4992a0a47d7.png",
        "images": {
          "transparent": "https://fortnite-public-files.theapinetwork.com/emote/d419d60590ab75882c1fc4992a0a47d7.png",
          "background": "https://fortnite-public-files.theapinetwork.com/image/c1d1255-1e7ff5b-0f08b6a-4032d59.png",
          "information": "https://fortnite-public-files.theapinetwork.com/image/c1d1255-1e7ff5b-0f08b6a-4032d59/item.png",
          "featured": {
            "transparent": null
          }
        },
        "captial": "emote",
        "type": "emote",
        "rarity": "epic",
        "obtained": "",
        "obtained_type": "none"
      },
      "ratings": {
        "avgStars": 4.32,
        "totalPoints": 268,
        "numberVotes": 62
      }
    }
  ]
}
```

### Get user ID
You don't need an API key for this method
```js
const fortnite = require("fortnite-9812")

fortnite.getID("Ñoт Tfuе")//you need to give an username
.then(user => console.log(user))
.catch(err => console.error(err))
```

example json response:
```json
{
  "uid": "126c2c59f45646718a5e0406d83be593",
  "username": "Ñoт Tfuе",
  "platforms": [
    "nintendo",
    "pc",
    "ps4"
  ],
  "seasons": [
    "season7"
  ]
}
```
### Get battle royal stats by ID
```js
const  fortnite  =  require("fortnite-9812")

fortnite.getStatsId("126c2c59f45646718a5e0406d83be593", "ps4")//fortnite.getStatsId(USER ID, PLATFORM)
.then(stats  =>  console.log(stats))
.catch(err  =>  console.error(err))
```
this return
```json
{
  "cached": false,
  "uid": "126c2c59f45646718a5e0406d83be593",
  "username": "Manaf941",
  "platform": "ps4",
  "timestamp": 1547329460,
  "window": "alltime",
  "stats": {
    "kills_solo": 3971,
    "placetop1_solo": 26,
    "placetop10_solo": 203,
    "placetop25_solo": 520,
    "matchesplayed_solo": 2943,
    "kd_solo": 1.36,
    "winrate_solo": 0.88,
    "score_solo": 354303,
    "minutesplayed_solo": 4585,
    "lastmodified_solo": 1547139965,
    "kills_duo": 3180,
    "placetop1_duo": 40,
    "placetop5_duo": 190,
    "placetop12_duo": 440,
    "matchesplayed_duo": 2513,
    "kd_duo": 1.29,
    "winrate_duo": 1.59,
    "score_duo": 328987,
    "minutesplayed_duo": 1674,
    "lastmodified_duo": 1547144986,
    "kills_squad": 3863,
    "placetop1_squad": 45,
    "placetop3_squad": 134,
    "placetop6_squad": 295,
    "matchesplayed_squad": 2774,
    "kd_squad": 1.42,
    "winrate_squad": 1.62,
    "score_squad": 362532,
    "minutesplayed_squad": 1507,
    "lastmodified_squad": 1547310299
  },
  "totals": {
    "kills": 11014,
    "wins": 111,
    "matchesplayed": 8230,
    "minutesplayed": 7766,
    "hoursplayed": 129,
    "score": 1045822,
    "winrate": 1.35,
    "kd": 1.36,
    "lastupdate": 1547144986
  }
}
```

### Get battle royale Stats from Name
There is two ways to get the battle royale stats, the first is without API key and the second uses TRN api key
**Without APi key**
*note: this method do the same as fortnite#getID and fortnite#getStatsId*
It is better to use this method than get the id and use getStatsId.
This method does not require an API key
```js
const  fortnite  =  require("fortnite-9812")

fortnite.getStatsName("Ñoт Tfuе", "ps4")//fortnite.getStatsId(USERNAME, PLATFORM)
.then(stats  =>  console.log(stats))
.catch(err  =>  console.error(err))
```

expected output
```json
{
  "cached": false,
  "uid": "126c2c59f45646718a5e0406d83be593",
  "username": "Manaf941",
  "platform": "ps4",
  "timestamp": 1547329460,
  "window": "alltime",
  "stats": {
    "kills_solo": 3971,
    "placetop1_solo": 26,
    "placetop10_solo": 203,
    "placetop25_solo": 520,
    "matchesplayed_solo": 2943,
    "kd_solo": 1.36,
    "winrate_solo": 0.88,
    "score_solo": 354303,
    "minutesplayed_solo": 4585,
    "lastmodified_solo": 1547139965,
    "kills_duo": 3180,
    "placetop1_duo": 40,
    "placetop5_duo": 190,
    "placetop12_duo": 440,
    "matchesplayed_duo": 2513,
    "kd_duo": 1.29,
    "winrate_duo": 1.59,
    "score_duo": 328987,
    "minutesplayed_duo": 1674,
    "lastmodified_duo": 1547144986,
    "kills_squad": 3863,
    "placetop1_squad": 45,
    "placetop3_squad": 134,
    "placetop6_squad": 295,
    "matchesplayed_squad": 2774,
    "kd_squad": 1.42,
    "winrate_squad": 1.62,
    "score_squad": 362532,
    "minutesplayed_squad": 1507,
    "lastmodified_squad": 1547310299
  },
  "totals": {
    "kills": 11014,
    "wins": 111,
    "matchesplayed": 8230,
    "minutesplayed": 7766,
    "hoursplayed": 129,
    "score": 1045822,
    "winrate": 1.35,
    "kd": 1.36,
    "lastupdate": 1547144986
  }
}
```
**TRN method**
example:
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
TRN:  "<TRN API key if you have one>"
//fnbrToken: "<fnbr.co API key if you have one>"
})//from now, you can use all the function that require the client

client.brStats("Ñoт Tfuе", "ps4")//client.brStats(USERNAME, PLATFORM)
.then(stats  =>  console.log(stats))
.catch(err  =>  console.error(err))
```
response example:
```json
{
  "accountId": "126c2c59-f456-4671-8a5e-0406d83be593",
  "platformId": 2,
  "platformName": "psn",
  "platformNameLong": "PlayStation 4",
  "epicUserHandle": "Ñoт Tfuе",
  "stats": {
    "p2": {
      "trnRating": {
        "label": "TRN Rating",
        "field": "TRNRating",
        "category": "Rating",
        "valueInt": 1190,
        "value": "1190",
        "rank": 1646154,
        "percentile": 56,
        "displayValue": "1,190"
      }
    },
    "curr_p9": {
      "trnRating": {
        "label": "TRN Rating",
        "field": "TRNRating",
        "category": "Rating",
        "valueInt": 1200,
        "value": "1200",
        "percentile": 34,
        "displayValue": "1,200"
      }
    }
  },
  "lifeTimeStats": [
    {
      "key": "Top 5s",
      "value": "190"
    },
    {
      "key": "Top 3s",
      "value": "134"
    }
  ],
  "recentMatches": [
    {
      "id": 1227383480,
      "accountId": "126c2c59-f456-4671-8a5e-0406d83be593",
      "playlist": "p10",
      "kills": 26,
      "minutesPlayed": -444,
      "top1": 0,
      "top5": 1,
      "top6": 0,
      "top10": 0,
      "top12": 2,
      "top25": 0,
      "matches": 17,
      "top3": 0,
      "dateCollected": "2019-01-13T00:03:53.69",
      "score": 1982,
      "platform": 3,
      "trnRating": 1198.1,
      "trnRatingChange": -0.0043725966597089605
    }
  ]
}
```

### Get servers status
check if the fortnite servers are UP
```js
const  fortnite  =  require("fortnite-9812")

fortnite.servers()
.then(status  =>  console.log(status))
.catch(err  =>  console.error(err))
```
expected output:
```json
{
  "status": "UP",
  "message": "Fortnite is up.",
  "version": "7.10",
  "time": {
    "since": {
      "seconds": "1545132605"
    },
    "duration": {
      "seconds": 2198745,
      "formated": "25 days, 10 hour, 45 minutes and 45 seconds"
    }
  }
}
```

### Get cosmetics stats
This method need an API key from fnbr.co
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
	//TRN: "<TRN API key if you have one>", Not required for this example
	fnbrToken:  "<fnbr API key if you have one>"
})//from now, you can use all the function that require the client
  
client.fnbrStats()
.then(items  =>  console.log(items))
.catch(err  =>  console.error(err))
```
example of output:
```json
{
  "totalCosmetics": 1292,
  "matrix": [
  //an array with all the type of item (loading, outfit,...)
    {
      "type": "loading",
      "rarity": [
        {
          "rarity": "uncommon",
          "count": 62
        },
        {
          "rarity": "rare",
          "count": 1
        }
      ]
    }
  ],
  "unreleased": 10
}
```

### Get cosmetic image
This method need an APi key from fnbr.co
**Client.fnbrImage(jsonObject)**
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
//TRN: "<TRN API key if you have one>", Not required for this example
fnbrToken:  "<FNBR API key if you have one>"
})//from now, you can use all the function that require the client

client.fnbrImage({name:  "straw ops", type:  "outfit", limit:  10})
.then(search  =>  console.log(search))
.catch(err  =>  console.error(err))
```
this produce:
```json
{
  "status": 200,
  "data": [
    {
      "id": "5bb4753bd022e1faa8cbfb5c",
      "name": "Straw Ops",
      "price": "1,500",
      "priceIcon": "vbucks",
      "priceIconLink": "https://image.fnbr.co/price/icon_vbucks.png",
      "images": {
        "icon": "https://image.fnbr.co/outfit/5bb4753bd022e1faa8cbfb5c/icon.png",
        "png": false,
        "gallery": false,
        "featured": "https://image.fnbr.co/outfit/5bb4753bd022e1faa8cbfb5c/featured.png"
      },
      "rarity": "epic",
      "type": "outfit",
      "slug": "straw-ops",
      "readableType": "Outfit",
      "description": "The harvest grows near."
    }
  ],
  "query": {
    "search": "straw ops",
    "limit": 10,
    "type": "outfit"
  }
}
```

### Generate an image with the fortnite font
You can easily generate a link to an image with the text that you want. This method does not require any credentials. 
```js
const  fortnite  =  require("fortnite-9812")

fortnite.text({text:  "this is a test for the fortnite.text method", size:  160, color:  "FFFFFF"})// {text: "<text>", size: <number>, color: "<hex color>"}
.then(url  =>  console.log(url))//expected output: http://fortnitefontgenerator.com/img.php?fontsize=160&textcolor=FFFFFF&text=this%20is%20a%20test%20for%20the%20fortnite.text%20method
.catch(err  =>  console.error(err))
```
this console.log: "http://fortnitefontgenerator.com/img.php?fontsize=160&textcolor=FFFFFF&text=this%20is%20a%20test%20for%20the%20fortnite.text%20method"
the object in the parameters is necessary. The "text" var in the json is obliged. the color and size are optional.
the color parameter is a hex color and the size is size in pixel for the text.

### Get a list of fortnite challenge
there is two method for getting challenge, One with TRN API key and the other without.
**TRN method**
example:
```js
const  fortnite  =  require("fortnite-9812")
const  client  =  new  fortnite.Client({
	TRN:  "<TRN API key if you have one>"
	//fnbrToken: "<fnbr.co API key if you have one>"
})//from now, you can use all the function that require the client

client.TRNChallenge()
.then(challenge  =>  console.log(challenge)))
.catch(err  =>  console.error(err))
```
example response:
```json
{
    "items": [
      {
        "metadata": [
          {
            "key": "type",
            "value": "challenge"
          },
          {
            "key": "name",
            "value": "Record a speed of 27 or more on different Radar Signs"
          },
          {
            "key": "questsCompleted",
            "value": "0"
          },
          {
            "key": "questsTotal",
            "value": "1"
          },
          {
            "key": "rewardPictureUrl",
            "value": "https://cdn.thetrackernetwork.com/cdn/trackernetwork/63D2upload.png"
          },
          {
            "key": "rewardName",
            "value": "5"
          },
          {
            "key": "rewardDescription"
          }
        ]
      },
      {
        "metadata": [
          {
            "key": "type",
            "value": "challenge"
          },
          {
            "key": "name",
            "value": "Jump through flaming hoops with a Quadcrasher or ATK"
          }
        ]
      }
    ]
  }
```
the challenge list will look like this

**Whitout APi key and suply the season**
```js
const  fortnite  =  require("fortnite-9812")

fortnite.challenge("current")//season of fortnite to lookup < 3 to current > or "current"
.then(challenge  =>  console.log(challenge))
.catch(err  =>  console.error(err))
```
console.log this:
```json
{
  "language": "en",
  "season": 7,
  "currentweek": 6,
  "star": "https://fortnite-public-files.theapinetwork.com/fortnite-br-challenges-star.png",
  "challenges": {
    "week1": [
      {
        "identifier": "e2c420d-928d4bf-8ce0ff2-ec19b37",
        "challenge": "Pick up an item of each rarity",
        "total": 5,
        "stars": 5,
        "difficulty": "normal"
      }
    ],
    "week2": [
      {
        "identifier": "32bb90e-8976aab-5298d5d-a10fe66",
        "challenge": "Search a Chest in different Named Locations",
        "total": 7,
        "stars": 5,
        "difficulty": "normal"
      }
    ],
    "week3": [
      {
        "identifier": "d2ddea1-8f00665-ce8623e-36bd4e3",
        "challenge": "Ride a Zipline in different matches",
        "total": 5,
        "stars": 5,
        "difficulty": "normal"
      }
    ],
    "week4": [
      {
        "identifier": "ad61ab1-43223ef-bc24c7d-2583be6",
        "challenge": "Use an X-4 Stormwing plane in different matches",
        "total": 5,
        "stars": 5,
        "difficulty": "normal"
      }
    ],
    "week5": [
      {
        "identifier": "d09bf41-544a336-5a46c90-77ebb5e",
        "challenge": "Stage 1: Land at Polar Peak",
        "total": 1,
        "stars": 1,
        "difficulty": "normal"
      }
    ],
    "week6": [
      {
        "identifier": "fbd7939-d674997-cdb4692-d34de86",
        "challenge": "Search an Ammo Box in different Named Locations",
        "total": 7,
        "stars": 5,
        "difficulty": "normal"
      }
    ],
    "week7": [],
    "week8": [],
    "week9": [],
    "week10": []
  }
}
```
This wil return something like that.
### Get any URL with a fnbr.co api key
If you want to call an URL that is not on their api with your API key, you can:
```js
const fortnite = require("fortnite-9812")
const client = new fortnite.Client(
	fnbrToken: "<FNBR API key>"
)

client.fnbrGet("https://fnbr.co/api/stats")//maybe you're using some kind of proxies so you can change the url to get these data.
.then(res => console.log(res))
.catch(err => console.error(err))
```
*note: use the adapted method, if you want to get the shop, then, get the shop with Client#fnbrShop. This is only for people who want to use another URL or if the api gets uptdated and the package is not yet*

### Get a list of items in the game
You can get a list of cosmetics items in the game without authentication.
use fortnite#

## Credits:
All credit goes to Epic Games for all request without token, fnbr.co for all request with their api key and TRN for request with their API key.

If you need help, create an issue or contact me on discord: Manaf#9812![Package by Manaf#](http://fortnitefontgenerator.com/img.php?fontsize=200&textcolor=000000&text=Manaf%239812)