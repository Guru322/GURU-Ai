import { IMapStorage } from '../IMapStorage';
import { ICustomNode } from '../../custom-nodes/ICustomNode';
export interface IControlFlowStorage extends IMapStorage<string, ICustomNode> {
}
