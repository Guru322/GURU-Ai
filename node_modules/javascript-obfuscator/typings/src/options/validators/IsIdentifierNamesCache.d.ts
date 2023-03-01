import { ValidationOptions } from 'class-validator';
import { IOptions } from '../../interfaces/options/IOptions';
export declare function IsIdentifierNamesCache(validationOptions?: ValidationOptions): (options: IOptions, propertyName: keyof IOptions) => void;
