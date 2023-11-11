import truesearch from 'truesearch';

let handler = async (m, { conn, text }) => {
  let ifone;

  if (!text && m.quoted) {

    let phoneNumber = m.quoted.sender.replace(/[^0-9]/g, '');


    ifone = `+${phoneNumber}`;
  } else {
    throw `please give a number in international format or quote a user`;
  }

  try {
    const installationId = 'a1i0D--j3deY0V_k_vQthFibnfb2sS3cf7uttIZnc7UNs9W9JkCGQCwS671R85tI';

    let json = await truesearch(ifone, installationId);

  

    json.creator = 'GURU';

    let milf = '';
    for (let prop in json) {
      if (prop === 'addresses') {
        milf += `⚝ *${prop}:*\n`;
        for (let addressProp in json[prop][0]) {
          milf += `  ⚝ *${addressProp}:* ${json[prop][0][addressProp]}\n`;
        }
      } else if (prop === 'countryDetails') {
        milf += `⚝ *${prop}:*\n`;
        for (let countryProp in json[prop]) {
          if (Array.isArray(json[prop][countryProp])) {
            milf += `  ⚝ *${countryProp}:* ${json[prop][countryProp].join(', ')}\n`;
          } else {
            milf += `  ⚝ *${countryProp}:* ${json[prop][countryProp]}\n`;
          }
        }
      } else {
        milf += `⚝ *${prop}:* ${json[prop]}\n`;
      }
    }

    m.reply(milf);
  } catch (error) {
    console.error(error);
    
  }
};

handler.help = ['true'];
handler.tags = ['tools'];
handler.command = /^(true|caller)$/i;

export default handler;

