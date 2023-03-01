function isClonable(obj) {
    return (typeof obj === 'object')
        && (obj !== null)
        && ('clone' in obj)
        && typeof obj.clone === 'function';
}
export { isClonable };
//# sourceMappingURL=clonable.js.map