import { ValidationOptions } from 'class-validator';
import { TTypeFromEnum } from '../../types/utils/TTypeFromEnum';
import { IOptions } from '../../interfaces/options/IOptions';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
export declare function IsAllowedForObfuscationTargets(obfuscationTargets: TTypeFromEnum<typeof ObfuscationTarget>[], validationOptions?: ValidationOptions): (options: IOptions, propertyName: keyof IOptions) => void;
