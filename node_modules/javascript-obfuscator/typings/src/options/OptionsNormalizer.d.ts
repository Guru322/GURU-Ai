import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';
export declare class OptionsNormalizer implements IOptionsNormalizer {
    private static readonly normalizerRules;
    normalize(options: IOptions): IOptions;
}
