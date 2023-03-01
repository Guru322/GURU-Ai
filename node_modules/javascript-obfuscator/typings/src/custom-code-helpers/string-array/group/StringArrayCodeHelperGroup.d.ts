import { TCustomCodeHelperFactory } from '../../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { ICallsGraphData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
export declare class StringArrayCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    private static readonly stringArrayCallsWrapperCodeHelperMap;
    protected customCodeHelpers: Map<CustomCodeHelper, ICustomCodeHelper>;
    private readonly customCodeHelperFactory;
    private readonly stringArrayStorage;
    constructor(customCodeHelperFactory: TCustomCodeHelperFactory, stringArrayStorage: IStringArrayStorage, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    appendOnFinalizingStage(nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;
    initialize(): void;
    private getStringArrayCallsWrapperCodeHelperName;
    private getScopeStatementRandomIndex;
}
