let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw '*ENTER THE MESSAGE YOU WANT TO BROADCAST*'
    for (let i of anu) {
    await delay(500)
    conn.relayMessage(i, 
{ liveLocationMessage: {
  degreesLatitude: 35.685506276233525,
  degreesLongitude: 139.75270667105852,
  accuracyInMeters: 0,
degreesClockwiseFromMagneticNorth: 2,
caption: '[ATTENTION]\n\n' + pesan + '\n\nTHIS IS AN OFFICIAL STATEMENT',
sequenceNumber: 2,
timeOffset: 3,
contextInfo: m,
}}, {}).catch(_ => _)
    }
  m.reply(`*MESSAGE SENT TO ${anu.length} GROUP/S*\n\n*NOTE: THIS COMMAND MAY FAIL AND NOT BE SENT TO ALL CHATS, SORRY FOR THE TIME BEING*`)
}
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

export default handler
