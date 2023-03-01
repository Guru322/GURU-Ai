import * as ESTree from 'estree';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IPropertyIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IRenamePropertiesReplacer } from '../../../interfaces/node-transformers/rename-properties-transformers/replacer/IRenamePropertiesReplacer';
export declare class RenamePropertiesReplacer implements IRenamePropertiesReplacer {
    private static readonly reservedDomPropertiesList;
    private readonly identifierNamesGenerator;
    private readonly excludedPropertyNames;
    private readonly propertyIdentifierNamesCacheStorage;
    private readonly propertyNamesMap;
    private readonly options;
    constructor(identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory, propertyIdentifierNamesCacheStorage: IPropertyIdentifierNamesCacheStorage, options: IOptions);
    excludePropertyName(propertyName: string): void;
    replace(node: ESTree.Identifier | ESTree.Literal): ESTree.Identifier | ESTree.Literal;
    private replacePropertyName;
    private isReservedName;
    private isExcludedName;
    private isReservedOptionName;
    private isReservedDomPropertyName;
}
