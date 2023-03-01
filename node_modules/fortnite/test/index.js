const Client = require('../');

const fortnite = new Client(require('./config').Token);

(async () => {
  const user = await fortnite.user('monsterdface', 'pc');

  const store = await fortnite.store();

  const challenges = await fortnite.challenges();

  console.log(user, store, challenges);
})();

process.on('unhandledRejection', console.error);
