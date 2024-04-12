
import {translate} from '@vitalets/google-translate-api'
const defaultLang = 'en'
const tld = 'cn'

let handler = async (m, { args, usedPrefix, command }) => {
    let err = `
📌 *Example:*

*${usedPrefix + command}* <id> [text]
*${usedPrefix + command}* en Hello World

≡ *List of supported languages:* 

https://i.imgur.com/jB1OijJ.jpeg
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text

    try {
       let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null) 
       m.reply(result.text)
    } catch (e) {
        throw err
    } 

}
handler.help = ['translate <lang> <text>']
handler.tags = ['tools']
handler.command = ['trt', 'tl', 'trad', 'tr']

export default handler
