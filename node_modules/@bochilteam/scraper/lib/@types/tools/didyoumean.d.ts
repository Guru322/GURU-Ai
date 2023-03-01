import similarity from 'similarity';
import { DidYouMean } from './types.js';
export default function didyoumean(query: string, list: string[], opts?: {
    threshold: number;
    opts?: Parameters<typeof similarity>[2];
}): DidYouMean[];
//# sourceMappingURL=didyoumean.d.ts.map