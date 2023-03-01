"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryableString = void 0;
class QueryableString {
    constructor(str) {
        this.str = str;
    }
    startsWith(searchString) {
        return this.str.indexOf(searchString) === 0;
    }
    endsWith(searchString) {
        let reverseString = "";
        const reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    }
    contains(searchString) {
        return (this.str.indexOf(searchString) !== -1);
    }
    equals(compareString) {
        return this.str === compareString;
    }
    value() {
        return this.str;
    }
}
exports.QueryableString = QueryableString;
//# sourceMappingURL=queryable_string.js.map