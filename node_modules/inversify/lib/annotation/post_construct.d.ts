declare const postConstruct: () => (target: {
    constructor: NewableFunction;
}, propertyKey: string) => void;
export { postConstruct };
