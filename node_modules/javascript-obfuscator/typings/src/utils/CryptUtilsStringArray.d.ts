import { ICryptUtilsStringArray } from '../interfaces/utils/ICryptUtilsStringArray';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { CryptUtils } from './CryptUtils';
export declare class CryptUtilsStringArray extends CryptUtils implements ICryptUtilsStringArray {
    protected readonly base64Alphabet: string;
    constructor(randomGenerator: IRandomGenerator);
    btoa(string: string): string;
}
