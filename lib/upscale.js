/**
 * Upscale Image Module
 * ------------------------
 * An image upscaling utility that uses iloveimg.com's API
 * 
 * Credits:
 * - Original Author : https://github.com/Guru322 
 * - Website: https://www.iloveimg.com/upscale-image
 * - Last updated: April 21, 2025
 * 
 * This module allows for upscaling images by 2x or 4x using AI processing
 * from the iloveimg.com web service.
 */

import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import os from 'os';
/**
 * Fetch the iloveimg upscale page and extract the taskId and token (JWT) from the ilovepdfConfig object
 * @returns {Promise<{taskId: string, token: string}>} The taskId and token values
 */
export async function getUpscaleTaskIdAndToken() {
    const url = 'https://www.iloveimg.com/upscale-image';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch upscale page: ${res.status}`);
    const html = await res.text();

    const taskIdMatch = html.match(/ilovepdfConfig\.taskId\s*=\s*['"]([^'"]+)['"]/)
    if (taskIdMatch) {
        const taskId = taskIdMatch[1];
        
        const tokenMatch = html.match(/ilovepdfConfig\.token\s*=\s*['"]([^'"]+)['"]/)
        if (tokenMatch) {
            return { taskId, token: tokenMatch[1] };
        }
    }
    
    try {
        const configMatch = html.match(/var\s+ilovepdfConfig\s*=\s*(\{[^;]+\});/)
        if (!configMatch) throw new Error('ilovepdfConfig object not found in the page HTML');
        
        const configStr = configMatch[1].replace(/([a-zA-Z0-9_$]+):/g, '"$1":')
                                        .replace(/'([^']*)':/g, '"$1":')
                                        .replace(/:"([^"]*)"/g, ':"$1"')
                                        .replace(/:'([^']*)'/g, ':"$1"');
        
        const config = JSON.parse(configStr);
        
        const taskId = config.taskId || html.match(/ilovepdfConfig\.taskId\s*=\s*['"]([^'"]+)['"]/)?.[1];
        const token = config.token;
        
        if (!taskId) throw new Error('TaskId not found in ilovepdfConfig');
        if (!token) throw new Error('Token not found in ilovepdfConfig');
        
        return { taskId, token };
    } catch (parseError) {
        console.error('Error parsing config:', parseError);
        
        const tokenPattern = /"token"\s*:\s*"([^"]+)"/;
        const tokenMatch = html.match(tokenPattern);
        if (!tokenMatch) throw new Error('Token not found in the page HTML');
        
        const taskIdMatch = html.match(/ilovepdfConfig\.taskId\s*=\s*['"]([^'"]+)['"]/);
        if (!taskIdMatch) throw new Error('TaskId not found in the page HTML');
        
        return { 
            taskId: taskIdMatch[1], 
            token: tokenMatch[1]
        };
    }
}

/**
 * Upload an image file to iloveimg with given taskId and JWT token
 * @param {string} filePath - Path to the image file
 * @param {string} taskId - Task ID from getUpscaleTaskIdAndToken()
 * @param {string} jwt - Authorization token (Bearer)
 * @returns {Promise<string>} server_filename from API response
 */
export async function uploadFileToServer(filePath, taskId, jwt) {
    if (!taskId || !jwt) {
        const result = await getUpscaleTaskIdAndToken();
        taskId = result.taskId;
        jwt = result.token;
    }
    
    const stats = await fs.promises.stat(filePath);
    console.log('File size:', stats.size, 'bytes');
    
    const fileStream = fs.createReadStream(filePath);
    const filename = path.basename(filePath);
    
    const form = new FormData();
    form.append('name', filename);
    form.append('chunk', '0');
    form.append('chunks', '1');
    form.append('task', taskId);
    form.append('preview', '1');
    form.append('pdfinfo', '0');
    form.append('pdfforms', '0');
    form.append('pdfresetforms', '0');
    form.append('v', 'web.0');
    
    console.log('Adding file to form:', filename);
    const contentType = filePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    form.append('file', fileStream, {
        filename: filename,
        contentType: contentType,
        knownLength: stats.size
    });
    
    const headers = {
        'authorization': `Bearer ${jwt}`,
        'accept': 'application/json',
        'Origin': 'https://www.iloveimg.com',
        'Referer': 'https://www.iloveimg.com/',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        ...form.getHeaders()
    };
    
    const res = await fetch('https://api1g.iloveimg.com/v1/upload', {
        method: 'POST',
        headers: headers,
        body: form,
    });
    
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} - ${errorText}`);
    }
    
    const json = await res.json();
    console.log('Upload response:', json);
    if (!json.server_filename) throw new Error('server_filename not returned from upload API');
    return json.server_filename;
}

/**
 * Download an image from a URL and save it to a temporary file, then upload it to iloveimg
 * @param {string} imageUrl - URL of the image to download
 * @param {string} taskId - Task ID from getUpscaleTaskIdAndToken()
 * @param {string} jwt - Authorization token (Bearer)
 * @returns {Promise<string>} server_filename from API response
 */
export async function downloadAndUpload(imageUrl, taskId, jwt) {
    if (!taskId || !jwt) {
        const result = await getUpscaleTaskIdAndToken();
        taskId = result.taskId;
        jwt = result.token;
    }

    console.log('Downloading image from:', imageUrl);
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);
    
    const buffer = await res.buffer();
    console.log('Downloaded image size:', buffer.length, 'bytes');
    
    let extension = 'jpg';
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('png')) {
        extension = 'png';
    } else if (imageUrl.toLowerCase().endsWith('.png')) {
        extension = 'png';
    }
    
    const tmpFilePath = path.join(os.tmpdir(), `download_${Date.now()}.${extension}`);
    await fs.promises.writeFile(tmpFilePath, buffer);
    
    try {
        return await uploadFileToServer(tmpFilePath, taskId, jwt);
    } finally {
        try {
            await fs.promises.unlink(tmpFilePath);
        } catch (e) {
            console.error('Failed to delete temporary file:', e);
        }
    }
}

/**
 * Fully upscale a image  by uploading and processing it
 * @param {string} filePathOrUrl - Path to the local image file or URL
 * @param {number} scale - Scale factor (e.g. 2 or 4)
 * @returns {Promise<any>} -  Buffer of image data
 */
export async function upscaleImage(filePathOrUrl, scale = 2) {
  const { taskId, token } = await getUpscaleTaskIdAndToken()
  const isUrl = /^https?:\/\//i.test(filePathOrUrl)
  const serverFilename = isUrl
    ? await downloadAndUpload(filePathOrUrl, taskId, token)
    : await uploadFileToServer(filePathOrUrl, taskId, token)
  const form = new FormData()
  form.append('task', taskId)
  form.append('server_filename', serverFilename)
  form.append('scale', String(scale))
  const res = await fetch('https://api1g.iloveimg.com/v1/upscale', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      Origin: 'https://www.iloveimg.com',
      Referer: 'https://www.iloveimg.com/'
    },
    body: form
  })
  if (!res.ok) throw new Error(`Upscale failed: ${res.status}`)
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return await res.json()
  } else {
    return await res.buffer()
  }
}


/**
(async () => {
  try {
    const result = await upscaleImage('url', 4)
    if (Buffer.isBuffer(result)) {
      const outFile = path.join(process.cwd(), 'upscaled.jpg')
      await fs.promises.writeFile(outFile, result)
      console.log('Saved upscaled image to', outFile)
    } else {
      console.log('Upscale response:', result)
    }
  } catch (err) {
    console.error('Upscale error:', err)
  }
})()

**/

