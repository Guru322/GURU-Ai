/**
 * Represents a single challenge.
 *
 * @class
 */
module.exports = class Challenge {
  /**
   * @param {Object} challenge Each individual challenge
   */
  constructor(challenge) {
    for (const item of challenge.metadata) {
      this[item.key.replace(/([a-z][A-Z])/g, word => `${word[0]}_${word[1].toLowerCase()}`)] = item.value || '';
    }
  }
};
