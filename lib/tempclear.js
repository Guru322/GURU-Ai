import Helper from './helper.js'
import { promises as fs } from 'fs'
import { tmpdir, platform } from 'os'
import { join } from 'path'

const maxtime = 1000 * 60 * 2

const __dirname = Helper.__dirname(import.meta)

export default async function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, '../tmp')]
  const deletedFiles = [] // Array to store deleted file paths

  await Promise.allSettled(
    tmp.map(async dir => {
      const files = await fs.readdir(dir)
      for (const file of files) {
        if (!file.endsWith('.file')) {
          const filePath = join(dir, file)
          const stat = await fs.stat(filePath)
          if (stat.isFile() && Date.now() - stat.mtimeMs >= maxtime) {
            // Check if the file can be opened
            if (platform() === 'win32') {
              let fileHandle
              try {
                fileHandle = await fs.open(filePath, 'r+')
              } catch (e) {
                // Log the error but continue with other files
                console.error('[clearTmp] Error opening file:', e.message)
                continue
              } finally {
                await fileHandle?.close()
              }
            }
            // Delete the file
            await fs.unlink(filePath)
            deletedFiles.push(filePath) // Add the deleted file to the array
          }
        }
      }
    })
  )

  // Log the number of deleted files
  console.log(`[clearTmp] Deleted ${deletedFiles.length} files.`)
}
