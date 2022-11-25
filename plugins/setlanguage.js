const translate = import("@vitalets/google-translate-api"),
	{ writeFileSync, readFileSync } = import("fs"),
	import db from '../language.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {

let language = Object.keys(translate.languages).splice(1);
		language.push("default");
		if (!language.includes(q))
			throw "Supported language:\n*Default Language:* default\n\n" + Json.stringify(translate.languages, null, 2);
		let user = db.find((x) => x.jid == msg.sender);
		if (user) db.splice(getPosition(msg.sender, db), 1);
		if (q == "default") db.splice(getPosition(msg.sender, db));
		q == "default" ? "" : db.push({ jid: msg.sender, country: q });
		writeFileSync("./language.json", Json.stringify(db));
		m.reply(`Success change language to "${q == "default" ? "default" : translate.languages[q]}"`);
}
handler.help = ['setlanguage'] 
handler.tags = ['Tools']
handler.command = ['setlanguage', 'setlng'] 

export default handler
