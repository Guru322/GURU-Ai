const fetch = require('node-fetch');

const Profile = require('./Profile');
const Store = require('./Store');
const Challenge = require('./Challenge');

const URL = 'https://api.fortnitetracker.com/v1';

/**
 * The main hub for the client, to be instantiated.
 *
 * @class
 */
module.exports = class Client {
  /**
   * @param {string} key Your API Key, provided by FortniteTracker
   */
  constructor(key) {
    this.headers = { headers: { 'TRN-Api-Key': key } };
  }

  /**
   * Gets the stats of a specific user, on a specific platform.
   *
   * @param {string} username The username of the player to be searched
   * @param {string} [platform = pc] The platform of the player to be searched
   *
   * @returns {Profile}
   */
  async user(username, platform = 'pc') {
    if (!username) throw new Error('You must supply a username');

    if (typeof username !== 'string') throw new TypeError(`Username expects a string, ${typeof username} given`);
    if (typeof platform !== 'string') throw new TypeError(`Platform expects a string, ${typeof platform} given`);

    const result = await fetch(`${URL}/profile/${platform}/${encodeURIComponent(username)}`, this.headers);
    const data = await result.json();

    // Invalid API Key
    if (data.message === 'Invalid authentication credentials') throw new Error(data.message);

    // Handling Player Not Found error
    if (data.error === 'Player Not Found') return { code: 404, error: 'Player Not Found' };
    // Handling any other error
    else if (data.error) return data;

    return new Profile(data);
  }

  /**
   * Gets the current store information.
   */
  async store() {
    const result = await fetch(`${URL}/store`, this.headers);
    const data = await result.json();

    // Invalid API Key
    if (data.message === 'Invalid authentication credentials') throw new Error(data.message);

    // Handling any other error
    else if (data.error) return data;

    return data.map(item => new Store(item));
  }

  /**
   * Gets the current active challenges.
   */
  async challenges() {
    const result = await fetch(`${URL}/challenges`, this.headers);
    const data = await result.json();

    // Invalid API Key
    if (data.message === 'Invalid authentication credentials') throw new Error(data.message);

    // Handling any other error
    else if (data.error) return data;

    return data.items.map(item => new Challenge(item));
  }
};
