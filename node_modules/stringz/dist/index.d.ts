/**
 * Converts a string to an array of string chars
 * @param {string} str The string to turn into array
 * @returns {string[]}
 */
export declare function toArray(str: string): string[];
/**
 * Returns the length of a string
 *
 * @export
 * @param {string} str
 * @returns {number}
 */
export declare function length(str: string): number;
/**
 * Returns a substring by providing start and end position
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} end End position
 * @returns {string}
 */
export declare function substring(str: string, begin?: number, end?: number): string;
/**
 * Returns a substring by providing start position and length
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} len Desired length
 * @returns {string}
 */
export declare function substr(str: string, begin?: number, len?: number): string;
/**
 * Enforces a string to be a certain length by
 * adding or removing characters
 *
 * @export
 * @param {string} str
 * @param {number} [limit=16] Limit
 * @param {string} [padString='#'] The Pad String
 * @param {string} [padPosition='right'] The Pad Position
 * @returns {string}
 */
export declare function limit(str: string, limit?: number, padString?: string, padPosition?: string): string;
/**
 * Returns the index of the first occurrence of a given string
 *
 * @export
 * @param {string} str
 * @param {string} [searchStr] the string to search
 * @param {number} [pos] starting position
 * @returns {number}
 */
export declare function indexOf(str: string, searchStr: string, pos?: number): number;
//# sourceMappingURL=index.d.ts.map