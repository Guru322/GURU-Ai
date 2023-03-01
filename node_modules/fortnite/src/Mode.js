/**
 * Represents a game mode.
 *
 * @class
 */
module.exports = class Mode {
  /**
   * @param {Object} stat Each individual stat
   */
  constructor(stat) {
    this.score = stat.score.valueInt;
    this.kd = stat.kd.valueDec;
    this.matches = stat.matches.valueInt;
    this.kills = stat.kills.valueInt;
    this.kills_per_match = stat.kpg.valueDec;
    this.score_per_match = stat.scorePerMatch.valueDec;
    this.wins = stat.top1.valueInt;
    this.top_3 = stat.top3.valueInt + this.wins;
    this.top_5 = stat.top5.valueInt + this.top_3 + this.wins;
    this.top_6 = stat.top6.valueInt + this.top_5 + this.top_3 + this.wins;
    this.top_12 = stat.top12.valueInt + this.top_6 + this.top_5 + this.top_3 + this.wins;
    this.top_25 = stat.top25.valueInt + this.top_12 + this.top_6 + this.top_5 + this.top_3 + this.wins;
  }
};
