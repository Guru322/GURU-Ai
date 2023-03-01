const Mode = require('./Mode');
const Stat = require('./Stat');
const Game = require('./Game');

/**
 * Represents a profile.
 *
 * @class
 */
module.exports = class Profile {
  /**
   * @param {Object} profile The stats for this specific profile
   */
  constructor(profile) {
    this.id = profile.accountId;
    this.username = profile.epicUserHandle;
    this.platform = profile.platformNameLong;
    this.url = `https://fortnitetracker.com/profile/${profile.platformName}/${this.username}`;
    this.stats = {};

    for (const mode in profile.stats) {
      this.stats[modes[mode]] = new Mode(profile.stats[mode]);
    }

    this.stats.lifetime = profile.lifeTimeStats.map(stat => new Stat(stat)).reduce((a, b) => ({ ...a, ...b }));
    this.stats.recent = profile.recentMatches.map(game => new Game(game));
  }
};

const modes = {
  p2: 'solo',
  p10: 'duo',
  p9: 'squad',
  curr_p2: 'current_solo',
  curr_p10: 'current_duo',
  curr_p9: 'current_squad'
};
