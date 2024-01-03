import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';
  let info = await apkinfo(text);
  let res = await apk(text);

  m.react(rwait);

        if (res.size > 113000000) {
            m.react(error)
            throw 'The apk file is too large. Maximum download size is 113MB.';
          }


  await conn.sendMessage(m.chat, {
    image: { url: info.icon },
    caption: `*Name:* ${info.name}\n*Package:* ${info.packageN}\n*OBB:* ${info.⏜✩ ˻𝐈ʈͥ᥊ ϻaͣŋͫŋ̑ο̑˼ 𓃮•:)}`,
    footer: '_Apk files..._',
  });

  await conn.sendMessage(m.chat, {
    text: `Downloading ${info.name}...`,
  });

  await conn.sendMessage(
    m.chat,
    { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
    { quoted: m }
  );
};

handler.command = /^(apk)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = false
export default handler;

async function apkinfo(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + url + '&limit=1');
  let $ = await res.json();

  try {
    let icon = $.datalist.list[0].icon;
  } catch {
    throw 'Can\'t download the apk!';
  }

  let icon = $.datalist.list[0].icon;
  let name = $.datalist.list[0].name;
  let packageN = $.datalist.list[0].package;
  let download = $.datalist.list[0].file.path;
  let obb_link;
  let obb;

  try {
    obb_link = await $.datalist.list[0].obb.main.path;
    obb = true;
  } catch {
    obb_link = '_not available_';
    obb = false;
  }

  if (!download) throw 'Can\'t download the apk!';
  return { obb, obb_link, name, icon, packageN };
}

async function apk(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
  let $ = await res.json();
  let fileName = $.datalist.list[0].package + '.apk';
  let download = $.datalist.list[0].file.path;
  let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');
  if (!download) throw 'Can\'t download the apk!';
  let icon = $.datalist.list[0].icon;
  let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

  return { fileName, mimetype, download, size };
}
