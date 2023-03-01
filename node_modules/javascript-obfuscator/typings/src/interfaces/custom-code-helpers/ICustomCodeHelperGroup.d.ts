import { TCustomCodeHelpersGroupAppendMethods } from '../../types/custom-code-helpers/TCustomCodeHelpersGroupAppendMethods';
import { ICustomCodeHelper } from './ICustomCodeHelper';
import { IInitializable } from '../IInitializable';
import { CustomCodeHelper } from '../../enums/custom-code-helpers/CustomCodeHelper';
export interface ICustomCodeHelperGroup extends IInitializable, TCustomCodeHelpersGroupAppendMethods {
    getCustomCodeHelpers(): Map<CustomCodeHelper, ICustomCodeHelper>;
    initialize(): void;
}
