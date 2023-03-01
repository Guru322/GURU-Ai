declare function propertyEventDecorator(eventKey: string, errorMessage: string): () => (target: {
    constructor: NewableFunction;
}, propertyKey: string) => void;
export { propertyEventDecorator };
