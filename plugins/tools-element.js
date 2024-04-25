import fetch from 'node-fetch'

let elementHandler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide an element symbol or name'

  try {
    let res = await fetch(`https://api.popcat.xyz/periodic-table?element=${text}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let buffer = await res.arrayBuffer()
    let json = JSON.parse(Buffer.from(buffer).toString())

    console.log('JSON response:', json)

    let elementInfo = `*Element Information:*\n
     • *Name:* ${json.name}\n
     • *Symbol:* ${json.symbol}\n
     • *Atomic Number:* ${json.atomic_number}\n
     • *Atomic Mass:* ${json.atomic_mass}\n
     • *Period:* ${json.period}\n
     • *Phase:* ${json.phase}\n
     • *Discovered By:* ${json.discovered_by}\n
     • *Summary:* ${json.summary}`

    conn.sendFile(m.chat, json.image, 'element.jpg', elementInfo, m)
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

elementHandler.help = ['element']
elementHandler.tags = ['tools']
elementHandler.command = /^(element|ele)$/i

export default elementHandler
