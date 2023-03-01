import { z } from 'zod';
declare type params = Parameters<typeof z.string>[0];
declare type ErrorArgs = {
    [key: string]: params;
};
export declare const ERROR_ARGS: ErrorArgs;
export {};
//# sourceMappingURL=constant.d.ts.map