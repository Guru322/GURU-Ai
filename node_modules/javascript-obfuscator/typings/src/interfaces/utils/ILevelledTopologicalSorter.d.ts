export interface ILevelledTopologicalSorter<TValue extends string = string> {
    add(precedent: TValue, consequent?: TValue | null): this;
    sort(): TValue[];
    sortByGroups(): TValue[][];
}
