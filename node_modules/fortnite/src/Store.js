/**
 * Represents the store.
 *
 * @class
 */
module.exports = class Store {
  /**
   * @param {Object} store Each individual store item
   */
  constructor(store) {
    this.id = store.manifestId;
    this.name = store.name;
    this.rarity = store.rarity;
    this.category = store.storeCategory;
    this.vbucks = store.vBucks;
    this.image = store.imageUrl;
  }
};
