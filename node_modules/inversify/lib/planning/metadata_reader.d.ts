import { interfaces } from "../interfaces/interfaces";
declare class MetadataReader implements interfaces.MetadataReader {
    getConstructorMetadata(constructorFunc: NewableFunction): interfaces.ConstructorMetadata;
    getPropertiesMetadata(constructorFunc: NewableFunction): interfaces.MetadataMap;
}
export { MetadataReader };
