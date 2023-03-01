export var NAMED_TAG = "named";
export var NAME_TAG = "name";
export var UNMANAGED_TAG = "unmanaged";
export var OPTIONAL_TAG = "optional";
export var INJECT_TAG = "inject";
export var MULTI_INJECT_TAG = "multi_inject";
export var TAGGED = "inversify:tagged";
export var TAGGED_PROP = "inversify:tagged_props";
export var PARAM_TYPES = "inversify:paramtypes";
export var DESIGN_PARAM_TYPES = "design:paramtypes";
export var POST_CONSTRUCT = "post_construct";
export var PRE_DESTROY = "pre_destroy";
function getNonCustomTagKeys() {
    return [
        INJECT_TAG,
        MULTI_INJECT_TAG,
        NAME_TAG,
        UNMANAGED_TAG,
        NAMED_TAG,
        OPTIONAL_TAG,
    ];
}
export var NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
//# sourceMappingURL=metadata_keys.js.map