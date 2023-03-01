import { ValidationError } from 'class-validator';
export declare class ValidationErrorsFormatter {
    static format(errors: ValidationError[]): string;
    private static formatWithNestedConstraints;
}
