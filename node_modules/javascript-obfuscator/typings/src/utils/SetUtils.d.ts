import { IArrayUtils } from '../interfaces/utils/IArrayUtils';
import { ISetUtils } from '../interfaces/utils/ISetUtils';
export declare class SetUtils implements ISetUtils {
    private readonly arrayUtils;
    constructor(arrayUtils: IArrayUtils);
    getLastElement<T>(set: Set<T>): T | undefined;
}
