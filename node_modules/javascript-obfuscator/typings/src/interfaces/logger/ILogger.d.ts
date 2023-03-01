import { LoggingMessage } from '../../enums/logger/LoggingMessage';
export interface ILogger {
    info(loggingMessage: LoggingMessage, value?: string | number): void;
    success(loggingMessage: LoggingMessage, value?: string | number): void;
    warn(loggingMessage: LoggingMessage, value?: string | number): void;
}
