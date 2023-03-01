import { Chalk } from 'chalk';
import { ILogger } from '../interfaces/logger/ILogger';
import { IOptions } from '../interfaces/options/IOptions';
import { LoggingMessage } from '../enums/logger/LoggingMessage';
import { LoggingPrefix } from '../enums/logger/LoggingPrefix';
export declare class Logger implements ILogger {
    static readonly colorInfo: Chalk;
    static readonly colorSuccess: Chalk;
    static readonly colorWarn: Chalk;
    private readonly options;
    constructor(options: IOptions);
    static log(loggingLevelColor: Chalk, loggingPrefix: LoggingPrefix, loggingMessage: string, value?: string | number): void;
    info(loggingMessage: LoggingMessage, value?: string | number): void;
    success(loggingMessage: LoggingMessage, value?: string | number): void;
    warn(loggingMessage: LoggingMessage, value?: string | number): void;
}
