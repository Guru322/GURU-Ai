import { ICryptUtils } from '../interfaces/utils/ICryptUtils';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
export declare class CryptUtils implements ICryptUtils {
    protected readonly base64Alphabet: string;
    private readonly randomGenerator;
    constructor(randomGenerator: IRandomGenerator);
    btoa(string: string): string;
    hideString(str: string, length: number): [string, string];
    rc4(string: string, key: string): string;
}
