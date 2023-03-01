"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STACK_OVERFLOW = exports.CIRCULAR_DEPENDENCY_IN_FACTORY = exports.ON_DEACTIVATION_ERROR = exports.PRE_DESTROY_ERROR = exports.POST_CONSTRUCT_ERROR = exports.ASYNC_UNBIND_REQUIRED = exports.MULTIPLE_POST_CONSTRUCT_METHODS = exports.MULTIPLE_PRE_DESTROY_METHODS = exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = exports.ARGUMENTS_LENGTH_MISMATCH = exports.INVALID_DECORATOR_OPERATION = exports.INVALID_TO_SELF_VALUE = exports.LAZY_IN_SYNC = exports.INVALID_FUNCTION_BINDING = exports.INVALID_MIDDLEWARE_RETURN = exports.NO_MORE_SNAPSHOTS_AVAILABLE = exports.INVALID_BINDING_TYPE = exports.NOT_IMPLEMENTED = exports.CIRCULAR_DEPENDENCY = exports.UNDEFINED_INJECT_ANNOTATION = exports.MISSING_INJECT_ANNOTATION = exports.MISSING_INJECTABLE_ANNOTATION = exports.NOT_REGISTERED = exports.CANNOT_UNBIND = exports.AMBIGUOUS_MATCH = exports.KEY_NOT_FOUND = exports.NULL_ARGUMENT = exports.DUPLICATED_METADATA = exports.DUPLICATED_INJECTABLE_DECORATOR = void 0;
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
var UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.UNDEFINED_INJECT_ANNOTATION = UNDEFINED_INJECT_ANNOTATION;
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
var LAZY_IN_SYNC = function (key) { return "You are attempting to construct '" + key + "' in a synchronous way\n but it has asynchronous dependencies."; };
exports.LAZY_IN_SYNC = LAZY_IN_SYNC;
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
var ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.ARGUMENTS_LENGTH_MISMATCH = ARGUMENTS_LENGTH_MISMATCH;
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_PRE_DESTROY_METHODS = "Cannot apply @preDestroy decorator multiple times in the same class";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
exports.ASYNC_UNBIND_REQUIRED = "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)";
var POST_CONSTRUCT_ERROR = function (clazz, errorMessage) { return "@postConstruct error in class " + clazz + ": " + errorMessage; };
exports.POST_CONSTRUCT_ERROR = POST_CONSTRUCT_ERROR;
var PRE_DESTROY_ERROR = function (clazz, errorMessage) { return "@preDestroy error in class " + clazz + ": " + errorMessage; };
exports.PRE_DESTROY_ERROR = PRE_DESTROY_ERROR;
var ON_DEACTIVATION_ERROR = function (clazz, errorMessage) { return "onDeactivation() error in class " + clazz + ": " + errorMessage; };
exports.ON_DEACTIVATION_ERROR = ON_DEACTIVATION_ERROR;
var CIRCULAR_DEPENDENCY_IN_FACTORY = function (factoryType, serviceIdentifier) {
    return "It looks like there is a circular dependency in one of the '" + factoryType + "' bindings. Please investigate bindings with" +
        ("service identifier '" + serviceIdentifier + "'.");
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = CIRCULAR_DEPENDENCY_IN_FACTORY;
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";
//# sourceMappingURL=error_msgs.js.map