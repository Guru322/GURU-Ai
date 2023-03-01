/**
Get the [iTerm2](https://www.iterm2.com) version.

@returns The iTerm2 version. If you're running this on a different terminal or operating system, it will return `undefined`.

@example
```
import iterm2Version from 'iterm2-version';

iterm2Version();
//=> '3.0.15'
```
*/
export default function iterm2Version(): string | undefined;
