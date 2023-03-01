import type { APIApplicationCommandOptionBase, APIApplicationCommandOptionWithAutocompleteOrChoicesWrapper, APIInteractionDataOptionBase } from './base';
import type { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from './shared';
export declare type APIApplicationCommandStringOption = APIApplicationCommandOptionWithAutocompleteOrChoicesWrapper<APIApplicationCommandOptionBase<ApplicationCommandOptionType.String>, APIApplicationCommandOptionChoice<string>>;
export interface APIApplicationCommandInteractionDataStringOption extends APIInteractionDataOptionBase<ApplicationCommandOptionType.String, string> {
    focused?: boolean;
}
//# sourceMappingURL=string.d.ts.map