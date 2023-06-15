case "mediafiredl":
      case "mediafire":
        if (!text) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid Mediafire link !\n\nExample: *${prefix}mediafire put_link*`
          );
        }
        if (!text.includes("mediafire.com")) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid Mediafire link !\n\nExample: *${prefix}mediafire put_link*`
          );
        }

        const MDF = await mediafireDl(text);
        if (MDF[0].size.split("MB")[0] >= 100)
          return m.reply("File is too large in size!");

        let txt = `        *『 Mediafire Downloader 』*
        
*🎀 File Name* : ${MDF[0].nama}
*🧩 File Size* : ${MDF[0].size}
*📌 File Format* : ${MDF[0].mime}

Downloading...`;

        await doReact("📥");
        await m.reply(txt);

        Atlas.sendMessage(
          m.from,
          {
            document: { url: MDF[0].url },
            mimetype: MDF[0].mime,
            fileName: MDF[0].nama,
          },
          { quoted: m }
        );
        break;
