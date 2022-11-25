import EventEmitter from "events"

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

const QUEQUE_DELAY = 5 * 1000

export default class Queque extends EventEmitter {
    _queque = new Set()

    constructor() {
        super()
    }

    add(item) {
        this._queque.add(item)
        // console.debug('add item to queque', item, 'in index', this._queque.size)
    }
    has(item) {
        return this._queque.has(item)
    }
    delete(item) {
        this._queque.delete(item)
        // console.debug('delete item from queque', item, 'now have', this._queque.size, 'in queque')
    }

    first() {
        return [...this._queque].shift()
    }
    isFirst(item) {
        return this.first() === item
    }
    last() {
        return [...this._queque].pop()
    }
    isLast(item) {
        return this.last() === item
    }

    getIndex(item) {
        return [...this._queque].indexOf(item)
    }

    getSize() {
        return this._queque.size
    }

    isEmpty() {
        return this.getSize() === 0
    }

    unqueue(item) {
        let queque;
        if (item) {
            if (this.has(item)) {
                queque = item
                const isFirst = this.isFirst(item)
                if (!isFirst) {
                    throw new Error('Item is not first in queque')
                }
            } else {
                // console.error('try to unqueue item', item, 'but not found')
            }
        } else {
            queque = this.first()
        }

        if (queque) {
            this.delete(queque)
            this.emit(queque)
        }
    }
    waitQueue(item) {
        return new Promise((resolve, reject) => {
            // console.debug('wait queque', item)
            if (this.has(item)) {
                const solve = async (removeQueque = false) => {
                    await delay(QUEQUE_DELAY)
                    // console.debug('wait queque', item, 'done!')
                    if (removeQueque) this.unqueue(item)
                    if (!this.isEmpty()) this.unqueue()
                    resolve()
                }

                if (this.isFirst(item)) {
                    // console.debug('wait queque', item, 'is first in queque')
                    solve(true)
                } else this.once(item, solve)
            } else {
                reject(new Error('item not found'))
            }
        })
    }
}
