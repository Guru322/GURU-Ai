import { TCustomCodeHelperFactory } from '../../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { ICallsGraphData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
export declare class SelfDefendingCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    protected customCodeHelpers: Map<CustomCodeHelper, ICustomCodeHelper>;
    private readonly customCodeHelperFactory;
    constructor(customCodeHelperFactory: TCustomCodeHelperFactory, identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, randomGenerator: IRandomGenerator, options: IOptions);
    appendOnPreparingStage(nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;
    initialize(): void;
}
