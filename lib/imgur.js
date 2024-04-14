import pkg from 'imgur'
import fs from 'fs'

const { ImgurClient } = pkg

const client = new ImgurClient({ clientId: 'a0113354926015a' })

async function uploadtoimgur(imagepath) {
  try {
    const response = await client.upload({
      image: fs.createReadStream(imagepath),
      type: 'stream',
    })

    let url = response.data.link
    console.log(url)
    return url
  } catch (error) {
    console.error('Error uploading image to Imgur:', error)
    throw error
  }
}

export default uploadtoimgur
