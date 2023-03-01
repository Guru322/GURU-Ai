/**
 * Represents a single game.
 *
 * @class
 */
module.exports = class Game {
  /**
   * @param {Object} game Each individual game
   */
  constructor(game) {
    this.warning = 'These stats seem to be botched, this is not my fault. Sorry for any inconvenience.';
    this.id = game.id;
    this.date = game.dateCollected;
    this.mode = modes[game.playlist];
    this.score = game.score;
    this.kills = game.kills;
    this.trn_rating = game.trnRating;
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
