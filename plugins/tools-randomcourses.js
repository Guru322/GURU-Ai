import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://eduscout.vercel.app/api/courses')
    if (!res.ok) throw await res.text()
    let json = await res.json()

    if (!json.courses || json.courses.length < 5) throw 'Not enough courses found'

    let courseData = '•───── ୨❀୧ ─────•\n'

    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * json.courses.length)
      let course = json.courses[randomIndex]
      // Remove the chosen course from the list so it's not chosen again
      json.courses.splice(randomIndex, 1)

      courseData += `❖ Course: ${course.name}\n❖ Link: ${course.udemyLink}\n\n`
    }

    courseData += '•───── ୨❀୧ ─────•'

    // Send the course data
    conn.reply(m.chat, courseData, m)
    m.react('🤩')
  } catch (e) {
    console.error(e)
    m.react('error')
  }
}
handler.help = ['course', 'randomcourse']
handler.tags = ['tools']
handler.command = ['course', 'randomcourse']

export default handler
