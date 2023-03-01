/**
 * Represents a single stat.
 *
 * @class
 */
module.exports = class Stat {
  /**
   * @param {Object} stat Each individual stat
   */
  constructor(stat) {
    stat.value = Number(stat.value);

    switch (stat.key) {
      case 'Score': this.score = stat.value; break;
      case 'K/d': this.kd = stat.value; break;
      case 'Matches Played': this.matches = stat.value; break;
      case 'Kills': this.kills = stat.value; break;
      case 'Wins': this.wins = stat.value; break;
      case 'Top 3s': this.top_3 = stat.value; break;
      case 'Top 5s': this.top_5 = stat.value; break;
      case 'Top 6s': this.top_6 = stat.value; break;
      case 'Top 12s': this.top_12 = stat.value; break;
      case 'Top 25s': this.top_25 = stat.value; break;
    }
  }
};
