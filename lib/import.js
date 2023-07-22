// inspired from https://github.com/nodejs/modules/issues/307#issuecomment-858729422

// import { resolve } from 'path'
// import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import Helper from './helper.js'

const WORKER_DIR = Helper.__dirname(import.meta.url, false)
// const WORKER_FILE = Helper.__filename(resolve(WORKER_DIR, './import.js'), false)

// if (!isMainThread) importModule(workerData)

// async function importModule(file) {
//     file = Helper.__filename(file)
//     const module = await import(file).catch(console.error)
//     const result = module && 'default' in module ? module.default : module
//     parentPort.postMessage(JSON.stringify(result), result)
// }

/**
 * @template T
 * @param {string} module 
 * @returns {Promise<T>}
 */
export default async function importLoader(module) {
    // return new Promise((resolve, reject) => {
    //     const worker = new Worker(new URL(WORKER_FILE), {
    //         workerData: module
    //     })
    //     const killWorker = () => worker.terminate().catch(() => { })
    //     worker.once('message', (msg) => (killWorker(), console.log(msg.data), resolve(msg)))
    //     worker.once('error', (error) => (killWorker(), reject(error)))
    // })
    module = Helper.__filename(module)
    const module_ = await import(`${module}?id=${Date.now()}`)
    const result = module_ && 'default' in module_ ? module_.default : module_
    return result
}