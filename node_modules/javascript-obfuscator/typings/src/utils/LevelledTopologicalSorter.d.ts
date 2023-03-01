import { ILevelledTopologicalSorter } from '../interfaces/utils/ILevelledTopologicalSorter';
export declare class LevelledTopologicalSorter<TValue extends string = string> implements ILevelledTopologicalSorter<TValue> {
    private readonly graph;
    add(precedent: TValue, consequent?: TValue | null): this;
    sort(): TValue[];
    sortByGroups(): TValue[][];
    private delete;
    private findRootNodes;
    private getPrecedents;
    private hasNodes;
    private hasPrecedents;
    private link;
    private register;
    private visit;
}
