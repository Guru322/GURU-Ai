export var DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
export var DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
export var NULL_ARGUMENT = "NULL argument";
export var KEY_NOT_FOUND = "Key Not Found";
export var AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
export var CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
export var NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
export var MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
export var MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
export var UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
export var CIRCULAR_DEPENDENCY = "Circular dependency found:";
export var NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
export var INVALID_BINDING_TYPE = "Invalid binding type:";
export var NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
export var INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
export var INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
export var LAZY_IN_SYNC = function (key) { return "You are attempting to construct '" + key + "' in a synchronous way\n but it has asynchronous dependencies."; };
export var INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
export var INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
export var ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
export var CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
export var CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
export var CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
export var CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
export var MULTIPLE_PRE_DESTROY_METHODS = "Cannot apply @preDestroy decorator multiple times in the same class";
export var MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
export var ASYNC_UNBIND_REQUIRED = "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)";
export var POST_CONSTRUCT_ERROR = function (clazz, errorMessage) { return "@postConstruct error in class " + clazz + ": " + errorMessage; };
export var PRE_DESTROY_ERROR = function (clazz, errorMessage) { return "@preDestroy error in class " + clazz + ": " + errorMessage; };
export var ON_DEACTIVATION_ERROR = function (clazz, errorMessage) { return "onDeactivation() error in class " + clazz + ": " + errorMessage; };
export var CIRCULAR_DEPENDENCY_IN_FACTORY = function (factoryType, serviceIdentifier) {
    return "It looks like there is a circular dependency in one of the '" + factoryType + "' bindings. Please investigate bindings with" +
        ("service identifier '" + serviceIdentifier + "'.");
};
export var STACK_OVERFLOW = "Maximum call stack size exceeded";
//# sourceMappingURL=error_msgs.js.map