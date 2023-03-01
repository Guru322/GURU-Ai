import { IOptions } from './IOptions';
export interface IOptionsNormalizer {
    normalize(options: IOptions): IOptions;
}
