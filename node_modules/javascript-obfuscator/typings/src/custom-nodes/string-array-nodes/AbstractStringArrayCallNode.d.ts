import * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStringArrayIndexNodeFactory } from '../../types/container/custom-nodes/string-array-index-nodes/TStringArrayIndexNodeFactory';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { AbstractCustomNode } from '../AbstractCustomNode';
import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
export declare abstract class AbstractStringArrayCallNode extends AbstractCustomNode {
    protected static readonly stringArrayRootCallsWrapperParametersCount: number;
    private static readonly stringArrayIndexNodesMap;
    protected readonly arrayUtils: IArrayUtils;
    protected readonly stringArrayStorage: IStringArrayStorage;
    private readonly stringArrayIndexNodeFactory;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, stringArrayIndexNodeFactory: TStringArrayIndexNodeFactory, customCodeHelperFormatter: ICustomCodeHelperFormatter, stringArrayStorage: IStringArrayStorage, arrayUtils: IArrayUtils, randomGenerator: IRandomGenerator, options: IOptions);
    protected getStringArrayIndexNode(index: number): ESTree.Expression;
    protected getRc4KeyLiteralNode(decodeKey: string): ESTree.Literal;
}
