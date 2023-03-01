import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayIndexNodeFactory } from '../../types/container/custom-nodes/string-array-index-nodes/TStringArrayIndexNodeFactory';
import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
export declare class StringArrayScopeCallsWrapperFunctionNode extends AbstractStringArrayCallNode {
    private upperStringArrayCallsWrapperData;
    private stringArrayScopeCallsWrapperData;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, stringArrayIndexNodeFactory: TStringArrayIndexNodeFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, stringArrayStorage: IStringArrayStorage, arrayUtils: IArrayUtils, randomGenerator: IRandomGenerator, options: IOptions);
    initialize(stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData, upperStringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData): void;
    protected getNodeStructure(): TStatement[];
    private getUpperStringArrayCallNode;
    private getFakeParameterNode;
    private getFakeUpperStringArrayIndexNode;
}
