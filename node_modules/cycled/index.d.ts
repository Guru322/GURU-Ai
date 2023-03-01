declare class Cycled<T> extends Array<T> {
	/**
	Initiates an array subclass with the methods documented below.
	Since it's an array, you can use all the normal array methods on it.

	The instance is an iterable that will cycle through the array.
	It will cycle through the number of elements equaling the length of the array from the current index.

	@example
	```
	import Cycled = require('cycled');

	const numberCycle = new Cycled([1, 2, 3, 4, 5]);

	console.log(...numberCycle);
	//=> 1 2 3 4 5

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
	*/
	constructor(elements: readonly T[]);

	/**
	Get or set the current index.
	*/
	index: number;

	/**
	Returns the current item.
	*/
	current(): T;

	/**
	Returns the next item.
	*/
	next(): T;

	/**
	Returns the previous item.
	*/
	previous(): T;

	/**
	Returns the item by going the given amount of `steps` through the array. For example, calling `step(2)` is like calling `next()` twice.

	You go backward by specifying a negative number.
	*/
	step(steps: number): T;

	/**
	Returns the item that is located in the given amount of `steps` through the array. For example, calling `peek(2)` would get the item 2 items after the current one.

	You go backward by specifying a negative number.

	This method is similar to `.step()` but without changing the current item.
	*/
	peek(steps: number): T;

	/**
	Returns an iterable that will cycle through the array indefinitely.
	*/
	indefinitely(): IterableIterator<T>;

	/**
	Returns an iterable that will cycle through the array backward indefinitely.
	*/
	indefinitelyReversed(): IterableIterator<T>;
}

export = Cycled;
