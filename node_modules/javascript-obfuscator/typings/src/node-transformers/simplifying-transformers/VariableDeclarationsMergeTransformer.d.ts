/// <reference types="estraverse" />
import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
export declare class VariableDeclarationsMergeTransformer extends AbstractNodeTransformer {
    constructor(randomGenerator: IRandomGenerator, options: IOptions);
    getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null;
    transformNode(variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): ESTree.VariableDeclaration | estraverse.VisitorOption;
}
