import { interfaces } from "../interfaces/interfaces";
import { getFunctionName } from "../utils/serialization";
declare function getDependencies(metadataReader: interfaces.MetadataReader, func: NewableFunction): interfaces.Target[];
declare function getBaseClassDependencyCount(metadataReader: interfaces.MetadataReader, func: NewableFunction): number;
export { getDependencies, getBaseClassDependencyCount, getFunctionName };
