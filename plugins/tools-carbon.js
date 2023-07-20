import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 'Please provide some text to generate the code image.', m)
  }

  let codeText = args.join(' ')

  try {
    let response = await fetch('https://carbonara.solopov.dev/api/cook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: codeText,
        backgroundColor: '#1F816D',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate the code image.')
    }

    let imageBuffer = await response.buffer();
    conn.sendFile(m.chat, imageBuffer, 'code.png', 'Here is the code image:', m)
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'An error occurred while generating the code image.', m)
  }
}

handler.help = ['.carbon <code>']
handler.tags = ['tools']
handler.command = /^carbon$/i;

export default handler
