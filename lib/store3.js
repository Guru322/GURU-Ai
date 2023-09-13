import fs from 'fs'
import path from 'path'
import store from './store2.js'

/** @type {import('@whiskeysockets/baileys')} */
var {
	BufferJSON
} = (await import('@whiskeysockets/baileys')).default

/**
 * 
 * @param {string} fileSingle 
 * @param {string} folderMulti
 * @param {Awaited<ReturnType<import('./store.js').MultiFileAuthStateStore>>} authState
 */
export default async function single2multi(fileSingle, folderMulti, authState) {
	var authSingleResult = JSON.parse(await fs.promises.readFile(fileSingle, 'utf8'), BufferJSON.reviver)
	var authSingleCreds = authSingleResult.creds || {}
	var authSingleKeys = authSingleResult.keys || {}

	var writeData = (data, file) => {
		return fs.promises.writeFile(path.join(folderMulti, store.fixFileName(file)), JSON.stringify(data, store.JSONreplacer))
	}

	var getKeyByValue = (obj, value) => {
		return Object.keys(obj).find(key => obj[key] === value)
	}

	var keys = Object.fromEntries(Object.entries(authSingleKeys).map(([key, value]) => (value && [getKeyByValue(store.KEY_MAP, key), value])).filter(Boolean))

	await Promise.all([
		writeData(authSingleCreds, 'creds.json'),
		authState.state.keys.set(keys),
	])
}