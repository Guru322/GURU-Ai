import fetch from 'node-fetch';

let pickupLineHandler = async (m, { conn, text }) => {
  try {
    let res = await fetch(`https://api.popcat.xyz/pickuplines`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\nContributor: ${json.contributor}`;

    m.reply(pickupLine);
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
};

pickupLineHandler.help = ['pickupline'];
pickupLineHandler.tags = ['fun'];
pickupLineHandler.command = /^(pickupline|pickup)$/i;

export default pickupLineHandler;
