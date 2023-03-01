# cycled [![Build Status](https://travis-ci.com/sindresorhus/cycled.svg?branch=master)](https://travis-ci.com/github/sindresorhus/cycled)

> Cycle through the items of an array

This package can be useful for cycling through tabs, images of slideshows, etc.

## Install

```
$ npm install cycled
```

## Usage

```js
const Cycled = require('cycled');

const cycled = new Cycled([1, 2, 3]);

cycled.current();
//=> 1

cycled.next();
//=> 2

cycled.next();
//=> 3

cycled.next();
//=> 1

cycled.previous();
//=> 3
```

## API

### `cycled = new Cycled(array)`

Initiates an array subclass with the methods documented below. Since it's an array, you can use all the normal array methods on it.

#### array

Type: `Array`

The array to wrap.

### cycled

The instance is an iterable that will cycle through the array. It will cycle through the number of elements equaling the length of the array from the current index.

```js
const numberCycle = new Cycled([1, 2, 3, 4, 5]);

console.log(...numberCycle);
//=> 1 2 3 4 5
```

#### current()

Returns the current item.

#### next()

Returns the next item.

#### previous()

Returns the previous item.

#### step(steps)

Returns the item by going the given amount of `steps` through the array. For example, calling `step(2)` is like calling `next()` twice. You go backward by specifying a negative number.

#### peek(steps)

Returns the item that is located in the given amount of `steps` through the array. For example, calling `peek(2)` would get the item 2 items after the current one. You go backward by specifying a negative number.

This method is similar to `.step()` but without changing the current item.

#### index

Get or set the current index.

#### indefinitely()

Returns an iterable that will cycle through the array indefinitely.

#### indefinitelyReversed()

Returns an iterable that will cycle through the array backward indefinitely.

## Example

Here we create a simple tab component that can have the active view set or go forward/backward through the tabs.

```js
const Cycled = require('cycled');

class TabComponent {
	constructor(views) {
		this.activeView = views[0];
		this.views = new Cycled(views);
	}

	setActiveView(view) {
		this.activeView = view;
		this.views.index = this.views.indexOf(view);
	}

	nextView() {
		setActiveView(this.views.next());
	}

	previousView() {
		setActiveView(this.views.previous());
	}
}

const tabs = new TabComponent([
	'Homepage',
	'Blog',
	'Projects',
	'Contact'
]);

// …

nextButton.addEventListener('click', () => {
	tabs.nextView();
});
```
