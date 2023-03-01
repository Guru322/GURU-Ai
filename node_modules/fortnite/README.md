# Fortnite [![npm downloads](https://img.shields.io/npm/dt/fortnite.svg?maxAge=3600)](https://www.npmjs.com/package/fortnite) [![Dependencies](https://img.shields.io/david/jake-ruston/fortnite.svg?maxAge=3600)](https://david-dm.org/jake-ruston/fortnite) [![RunKit](https://badge.runkitcdn.com/fortnite.svg)](https://npm.runkit.com/fortnite)

<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Fortnite.png" alt="fortnite" width="250" align="right" />

###### [Changelog](https://github.com/Jake-Ruston/fortnite/wiki/Changelog) | [Issues](https://github.com/Jake-Ruston/fortnite/issues)

A simple, easy to use module for interacting with the [FortniteTracker](https://fortnitetracker.com/) [API.](https://fortnitetracker.com/site-api)

## Setup and Installation
```
$ npm i fortnite
```

1. Signup at [FortniteTracker](https://fortnitetracker.com/)
2. Generate an [API Key](https://fortnitetracker.com/site-api)

## Getting Started
```js
// Bring in the Fortnite module
const Client = require('fortnite');
// Create an instance of the client with your API Key
const fortnite = new Client('Your-API-Key');

// All methods
fortnite.user('username', 'platform [pc, xbl, psn]').then(console.log);
fortnite.store().then(console.log);
fortnite.challenges().then(console.log);
```
