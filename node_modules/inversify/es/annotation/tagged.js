import { Metadata } from '../planning/metadata';
import { createTaggedDecorator } from './decorator_utils';
function tagged(metadataKey, metadataValue) {
    return createTaggedDecorator(new Metadata(metadataKey, metadataValue));
}
export { tagged };
//# sourceMappingURL=tagged.js.map