export interface IEscapeSequenceEncoder {
    encode(string: string, encodeAllSymbols: boolean): string;
}
