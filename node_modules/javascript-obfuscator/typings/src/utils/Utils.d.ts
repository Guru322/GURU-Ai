export declare class Utils {
    static readonly baseMultipleSourcesIdentifiersPrefix: string;
    static readonly hexadecimalPrefix: string;
    static buildVersionMessage(version?: string, buildTimestamp?: string): string;
    static extractDomainFrom(url: string): string;
    static getIdentifiersPrefixForMultipleSources(identifiersPrefix: string | undefined, sourceCodeIndex: number): string;
    static makeEnum<TObject extends {
        [index: string]: TValue;
    }, TValue extends string>(enumLikeObject: TObject): Readonly<TObject>;
}
