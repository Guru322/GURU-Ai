const dir = [
  'https://tinyurl.com/dados01',
  'https://tinyurl.com/dados02',
  'https://tinyurl.com/dados03',
  'https://tinyurl.com/dados04',
  'https://tinyurl.com/dados05',
  'https://tinyurl.com/dados06'
];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['dado', 'dados'] 

export default handler

