export interface ICryptUtils {
    btoa(string: string): string;
    hideString(str: string, length: number): [string, string];
    rc4(string: string, key: string): string;
}
