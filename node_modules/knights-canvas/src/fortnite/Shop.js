const Canvas = require("canvas"),
  fortnite = require("fortnite-9812"),
  fs = require("fs"),
  moment = require("moment");
const {
  formatVariable,
  applyText,
} = require("../../utils/functions");

module.exports = class FortniteShop {
  constructor() {
    this.token = null;
    this.textHeader = "FORTNITE ITEMS SHOP";
    this.textDaily = "DAILY";
    this.textFeatured = "FEATURED";
    this.textDate = "Fortnite shop of {date}";
    this.textFooter = "Generated with discord-canvas - fnbr.co";
    this.options = {
      lang: "en",
      dateFormat: "dddd, MMMM Do YYYY",
    };
    this.background = `${__dirname}/../../assets/img/fortnite/shop/background.png`;
  }

  setToken(value) {
    this.token = value;
    return this;
  }

  setBackground(value) {
    this.background = value;
    return this;
  }

  setText(variable, value) {
    const formattedVariable = formatVariable("text", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  lang(value) {
    this.options.lang = value;
    return this;
  }

  dateFormat(value) {
    this.options.dateFormat = value;
    return this;
  }

  async toAttachment() {
    if (!this.token) return console.log("Please enter a valid token fnbr.co !");

    const rarityCard = (value) => {
      let colorBorder = "#b1b1b1",
        colorCenter = "#bebebe",
        colorExt = "#646464";

      if (value === "legendary") {
        colorBorder = "#e98d4b";
        colorCenter = "#ea8d23";
        colorExt = "#78371d";
      } else if (value === "epic") {
        colorBorder = "#e95eff";
        colorCenter = "#c359ff";
        colorExt = "#4b2483";
      } else if (value === "rare") {
        colorBorder = "#37d1ff";
        colorCenter = "#2cc1ff";
        colorExt = "#143977";
      } else if (value === "uncommon") {
        colorBorder = "#87e339";
        colorCenter = "#69bb1e";
        colorExt = "#175117";
      } else if (value === "common") {
        colorBorder = "#b1b1b1";
        colorCenter = "#bebebe";
        colorExt = "#646464";
      } else if (value === "dark") {
        colorBorder = "#ff42e7";
        colorCenter = "#fb22df";
        colorExt = "#520c6f";
      } else if (value === "dc") {
        colorBorder = "#6094ce";
        colorCenter = "#5475c7";
        colorExt = "#243461";
      } else if (value === "marvel") {
        colorBorder = "#ef3537";
        colorCenter = "#c53334";
        colorExt = "#761b1b";
      } else if (value === "lava") {
        colorBorder = "#d19635";
        colorCenter = "#ea8d23";
        colorExt = "#6a0a31";
      } else if (value === "frozen") {
        colorBorder = "#c4dff7";
        colorCenter = "#94dfff";
        colorExt = "#269ed6";
      } else if (value === "slurp") {
        colorBorder = "#53f0ff";
        colorCenter = "#29f1a3";
        colorExt = "#12a9a4";
      } else if (value === "icon_series") {
        colorBorder = "#52e0e0";
        colorCenter = "#256b6b";
        colorExt = "#12a9a4";
      } else if (value === "shadow") {
        colorBorder = "#949494";
        colorCenter = "#717171";
        colorExt = "#191919";
      } else if (value === "star_wars") {
        colorBorder = "#e7c413";
        colorCenter = "#1b366e";
        colorExt = "#081737";
      }

      return {
        colorBorder: colorBorder,
        colorCenter: colorCenter,
        colorExt: colorExt,
      };
    };

    const fortniteClient = new fortnite.Client({ fnbrToken: this.token });

    let shop = await fortniteClient.fnbrShop();

    const filesDir = `${__dirname}/../../assets/img/fortnite/shop/cache`;

    fs.readdir(filesDir, function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function (file) {
        if (file.split(".")[1] === "png") {
          if (Number(file.split("_")[0]) < Date.now() - 86400000 * 5) {
            console.log(file);
            fs.unlinkSync(
              `${__dirname}/../../assets/img/fortnite/shop/cache/${file}`
            );
          }
        }
      });
    });

    const path = `${__dirname}/../../assets/img/fortnite/shop/cache/${new Date(
      shop.data.date
    ).getTime()}_${this.options.lang}.png`;

    if (fs.existsSync(path)) {
      return path;
    } else {
      let dateShop = this.textDate.replace(
          "{date}",
          moment(shop.data.date)
            .locale(this.options.lang)
            .format(this.options.dateFormat)
        ),
        dailyHeight =
          shop.data.daily.length < 9
            ? Math.ceil(shop.data.daily.length / 2) * 297
            : Math.ceil(shop.data.daily.length / 3) * 297,
        featuredHeight =
          shop.data.featured.length < 9
            ? Math.ceil(shop.data.featured.length / 2) * 297
            : Math.ceil(shop.data.featured.length / 3) * 297,
        canvas =
          shop.data.daily.length < 9 && shop.data.featured.length < 9
            ? shop.data.daily.length >= shop.data.featured.length
              ? Canvas.createCanvas(1220, 250 + dailyHeight)
              : Canvas.createCanvas(1220, 250 + featuredHeight)
            : shop.data.daily.length >= shop.data.featured.length
            ? Canvas.createCanvas(1220 + 297 * 2, 250 + dailyHeight)
            : Canvas.createCanvas(1220 + 297 * 2, 250 + featuredHeight),
        ctx = canvas.getContext("2d");

      /* BACKGROUND */
      if (this.background.startsWith("#")) {
        let background = this.background;
        ctx.fillStyle = background;
        if (canvas.height > 2026) {
          ctx.fillRect(0, 0, (canvas.height * 3268) / 2027, canvas.height);
        } else {
          ctx.fillRect(0, 0, 3268, 2027);
        }
      } else {
        let background = await Canvas.loadImage(
          `${__dirname}/../../assets/img/fortnite/shop/background.png`
        );
        if (canvas.height > 2026) {
          ctx.drawImage(
            background,
            0,
            0,
            (canvas.height * 3268) / 2027,
            canvas.height
          );
        } else {
          ctx.drawImage(background, 0, 0, 3268, 2027);
        }
      }
      // Draw title
      ctx.fillStyle = "#ffffff";
      ctx.font = "70px luckiest guy";
      ctx.textAlign = "center";
      ctx.fillText(this.textHeader, canvas.width / 2, 71);
      ctx.font = "50px luckiest guy";
      if (shop.data.daily.length < 9 && shop.data.featured.length < 9) {
        // Draw featured
        ctx.fillText(this.textFeatured, 298, 185);
        // Draw daily
        ctx.fillText(this.textDaily, 923, 185);
      } else {
        // Draw featured
        ctx.fillText(this.textFeatured, 447, 185);
        // Draw daily
        ctx.fillText(this.textDaily, canvas.width - 447, 185);
      }
      // Draw footter
      ctx.font = "43px KeepCalm";
      ctx.fillText(this.textFooter, canvas.width / 2, canvas.height - 18);
      // Extract and Draw date of shop
      ctx.font = "49px luckiest guy";
      ctx.fillText(dateShop, canvas.width / 2, 125);

      if (shop.data.daily.length < 9 && shop.data.featured.length < 9) {
        for (let i = 0; i < shop.data.featured.length; i++) {
          if (i & 1) {
            if (shop.data.featured[i].images.featured) {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.featured[i].rarity
              );

              ctx.fillStyle = colorBorder;
              ctx.fillRect(313, 51 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                313 + 3 + (268 - 3 * 2) / 2,
                51 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 313 + 3,
                (268 - 3 * 2) / 2 + 51 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(313 + 3, 51 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(
                shop.data.featured[i].images.featured
              );
              ctx.drawImage(item, 313 + 3, 51 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(313 + 3, 51 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.featured[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.featured[i].name,
                313 + 134,
                51 + 192 + 32 + 149 * i
              );
              let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.featured[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 313 + 93, 51 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 122,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  313 + 100,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 129,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  313 + 107,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 136,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  313 + 114,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 143,
                  51 + 192 + 65 + 149 * i
                );
              }
            } else {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.featured[i].rarity
              );

              ctx.fillStyle = colorBorder;
              ctx.fillRect(313, 51 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                313 + 3 + (268 - 3 * 2) / 2,
                51 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 313 + 3,
                (268 - 3 * 2) / 2 + 51 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(313 + 3, 51 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(
                shop.data.featured[i].images.icon
              );
              ctx.drawImage(item, 313 + 3, 51 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(313 + 3, 51 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.featured[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.featured[i].name,
                313 + 134,
                51 + 192 + 32 + 149 * i
              );
              let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.featured[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 313 + 93, 51 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 122,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  313 + 100,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 129,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  313 + 107,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 136,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  313 + 114,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  313 + 143,
                  51 + 192 + 65 + 149 * i
                );
              }
            }
          } else {
            if (shop.data.featured[i].images.featured) {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.featured[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(15, 200 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                15 + 3 + (268 - 3 * 2) / 2,
                200 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 15 + 3,
                (268 - 3 * 2) / 2 + 200 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(15 + 3, 200 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(
                shop.data.featured[i].images.featured
              );
              ctx.drawImage(item, 15 + 3, 200 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(15 + 3, 200 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.featured[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.featured[i].name,
                15 + 134,
                200 + 192 + 32 + 149 * i
              );
              let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.featured[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 122,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  15 + 100,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 129,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  15 + 107,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 136,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  15 + 114,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 143,
                  200 + 192 + 65 + 149 * i
                );
              }
            } else {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.featured[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(15, 200 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                15 + 3 + (268 - 3 * 2) / 2,
                200 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 15 + 3,
                (268 - 3 * 2) / 2 + 200 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(15 + 3, 200 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(
                shop.data.featured[i].images.icon
              );
              ctx.drawImage(item, 15 + 3, 200 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(15 + 3, 200 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.featured[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.featured[i].name,
                15 + 134,
                200 + 192 + 32 + 149 * i
              );
              let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.featured[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 122,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  15 + 100,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 129,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  15 + 107,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 136,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  15 + 114,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.featured[i].price,
                  15 + 143,
                  200 + 192 + 65 + 149 * i
                );
              }
            }
          }
        }
        for (let i = 0; i < shop.data.daily.length; i++) {
          if (i & 1) {
            if (shop.data.daily[i].images.daily) {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.daily[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(938, 51 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                938 + 3 + (268 - 3 * 2) / 2,
                51 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 938 + 3,
                (268 - 3 * 2) / 2 + 51 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(938 + 3, 51 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(
                shop.data.daily[i].images.daily
              );
              ctx.drawImage(item, 938 + 3, 51 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(938 + 3, 51 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.daily[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.daily[i].name,
                938 + 134,
                51 + 192 + 32 + 149 * i
              );
              let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.daily[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 938 + 93, 51 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 122,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  938 + 100,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 129,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  938 + 107,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 136,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  938 + 114,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 143,
                  51 + 192 + 65 + 149 * i
                );
              }
            } else {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.daily[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(938, 51 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                938 + 3 + (268 - 3 * 2) / 2,
                51 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 938 + 3,
                (268 - 3 * 2) / 2 + 51 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(938 + 3, 51 + 149 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

              let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
              ctx.drawImage(item, 938 + 3, 51 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(938 + 3, 51 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.daily[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.daily[i].name,
                938 + 134,
                51 + 192 + 32 + 149 * i
              );
              let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.daily[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(vbuck, 938 + 93, 51 + 192 + 42 + 149 * i, 25, 25);
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 122,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  938 + 100,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 129,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  938 + 107,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 136,
                  51 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  938 + 114,
                  51 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  938 + 143,
                  51 + 192 + 65 + 149 * i
                );
              }
            }
          } else {
            if (shop.data.daily[i].images.daily) {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.daily[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(640, 200 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                640 + 3 + (268 - 3 * 2) / 2,
                200 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 640 + 3,
                (268 - 3 * 2) / 2 + 200 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(
                640 + 3,
                200 + 149 * i + 3,
                268 - 3 * 2,
                268 - 3 * 2
              );

              let item = await Canvas.loadImage(
                shop.data.daily[i].images.daily
              );
              ctx.drawImage(item, 640 + 3, 200 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(640 + 3, 200 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.daily[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.daily[i].name,
                640 + 134,
                200 + 192 + 32 + 149 * i
              );
              let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.daily[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(
                  vbuck,
                  640 + 93,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 122,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  640 + 100,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 129,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  640 + 107,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 136,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  640 + 114,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 143,
                  200 + 192 + 65 + 149 * i
                );
              }
            } else {
              const { colorBorder, colorCenter, colorExt } = rarityCard(
                shop.data.daily[i].rarity
              );
              ctx.fillStyle = colorBorder;
              ctx.fillRect(640, 200 + 149 * i, 268, 268);
              const grd = ctx.createRadialGradient(
                640 + 3 + (268 - 3 * 2) / 2,
                200 + 149 * i + 3 + (268 - 3 * 2) / 2,
                4,
                (268 - 3 * 2) / 2 + 640 + 3,
                (268 - 3 * 2) / 2 + 200 + 149 * i + 3,
                (268 - 3 * 2) * 0.8
              );
              grd.addColorStop(0, colorCenter);
              grd.addColorStop(1, colorExt);
              ctx.fillStyle = grd;
              ctx.fillRect(
                640 + 3,
                200 + 149 * i + 3,
                268 - 3 * 2,
                268 - 3 * 2
              );

              let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
              ctx.drawImage(item, 640 + 3, 200 + 3 + 149 * i, 262, 262);
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#000000";
              ctx.fillRect(640 + 3, 200 + 192 + 149 * i, 262, 73);
              ctx.globalAlpha = 1;
              ctx.font = applyText(
                canvas,
                shop.data.daily[i].name,
                38,
                260,
                "luckiest guy"
              );
              ctx.fillStyle = "#ffffff";
              ctx.textAlign = "center";
              ctx.fillText(
                shop.data.daily[i].name,
                640 + 134,
                200 + 192 + 32 + 149 * i
              );
              let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
                vbuck = await Canvas.loadImage(
                  shop.data.daily[i].priceIconLink
                );
              ctx.textAlign = "left";
              ctx.font = "30px luckiest guy";
              if (price >= 1000) {
                ctx.drawImage(
                  vbuck,
                  640 + 93,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 122,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 100 && price < 1000) {
                ctx.drawImage(
                  vbuck,
                  640 + 100,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 129,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 10 && price < 100) {
                ctx.drawImage(
                  vbuck,
                  640 + 107,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 136,
                  200 + 192 + 65 + 149 * i
                );
              }
              if (price >= 0 && price < 10) {
                ctx.drawImage(
                  vbuck,
                  640 + 114,
                  200 + 192 + 42 + 149 * i,
                  25,
                  25
                );
                ctx.fillText(
                  shop.data.daily[i].price,
                  640 + 143,
                  200 + 192 + 65 + 149 * i
                );
              }
            }
          }
        }
      } else {
        let i1Featured = Math.ceil(shop.data.featured.length / 3),
          i2Featured = Math.ceil((shop.data.featured.length - i1Featured) / 2),
          i3Featured = Math.ceil(
            shop.data.featured.length - (i1Featured + i2Featured)
          ),
          i1Daily = Math.ceil(shop.data.daily.length / 3),
          i2Daily = Math.ceil((shop.data.daily.length - i1Daily) / 2),
          i3Daily = Math.ceil(shop.data.daily.length - (i1Daily + i2Daily));
        for (let i = 0; i < i1Featured; i++) {
          if (shop.data.featured[i].images.featured) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(15, 200 + 298 * i, 268, 268);
            const grd = ctx.createRadialGradient(
              15 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * i + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 15 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * i + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(15 + 3, 200 + 298 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.featured
            );
            ctx.drawImage(item, 15 + 3, 200 + 3 + 298 * i, 262, 262);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(15 + 3, 200 + 192 + 298 * i, 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              15 + 134,
              200 + 192 + 32 + 298 * i
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 122,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 129,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 136,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 143,
                200 + 192 + 65 + 298 * i
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(15, 200 + 298 * i, 268, 268);
            const grd = ctx.createRadialGradient(
              15 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * i + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 15 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * i + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(15 + 3, 200 + 298 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.icon
            );
            ctx.drawImage(item, 15 + 3, 200 + 3 + 298 * i, 262, 262);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(15 + 3, 200 + 192 + 298 * i, 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              15 + 134,
              200 + 192 + 32 + 298 * i
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(vbuck, 15 + 93, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 122,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(vbuck, 15 + 100, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 129,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(vbuck, 15 + 107, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 136,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(vbuck, 15 + 114, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.featured[i].price,
                15 + 143,
                200 + 192 + 65 + 298 * i
              );
            }
          }
        }
        for (let i = i1Featured; i < i1Featured + i2Featured; i++) {
          if (shop.data.featured[i].images.featured) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(313, 200 + 298 * (i - i1Featured), 268, 268);
            const grd = ctx.createRadialGradient(
              313 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - i1Featured) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 313 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - i1Featured) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              313 + 3,
              200 + 298 * (i - i1Featured) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.featured
            );
            ctx.drawImage(
              item,
              313 + 3,
              200 + 3 + 298 * (i - i1Featured),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(313 + 3, 200 + 192 + 298 * (i - i1Featured), 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              313 + 134,
              200 + 192 + 32 + 298 * (i - i1Featured)
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                313 + 93,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 122,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                313 + 100,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 129,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                313 + 107,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 136,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                313 + 114,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 143,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(313, 200 + 298 * (i - i1Featured), 268, 268);
            const grd = ctx.createRadialGradient(
              313 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - i1Featured) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 313 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - i1Featured) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              313 + 3,
              200 + 298 * (i - i1Featured) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.icon
            );
            ctx.drawImage(
              item,
              313 + 3,
              200 + 3 + 298 * (i - i1Featured),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(313 + 3, 200 + 192 + 298 * (i - i1Featured), 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              313 + 134,
              200 + 192 + 32 + 298 * (i - i1Featured)
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                313 + 93,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 122,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                313 + 100,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 129,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                313 + 107,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 136,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                313 + 114,
                200 + 192 + 42 + 298 * (i - i1Featured),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                313 + 143,
                200 + 192 + 65 + 298 * (i - i1Featured)
              );
            }
          }
        }
        for (
          let i = i1Featured + i2Featured;
          i < i1Featured + i2Featured + i3Featured;
          i++
        ) {
          if (shop.data.featured[i].images.featured) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(
              611,
              200 + 298 * (i - (i1Featured + i2Featured)),
              268,
              268
            );
            const grd = ctx.createRadialGradient(
              611 + 3 + (268 - 3 * 2) / 2,
              200 +
                298 * (i - (i1Featured + i2Featured)) +
                3 +
                (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 611 + 3,
              (268 - 3 * 2) / 2 +
                200 +
                298 * (i - (i1Featured + i2Featured)) +
                3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              611 + 3,
              200 + 298 * (i - (i1Featured + i2Featured)) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.featured
            );
            ctx.drawImage(
              item,
              611 + 3,
              200 + 3 + 298 * (i - (i1Featured + i2Featured)),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(
              611 + 3,
              200 + 192 + 298 * (i - (i1Featured + i2Featured)),
              262,
              73
            );
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              611 + 134,
              200 + 192 + 32 + 298 * (i - (i1Featured + i2Featured))
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                611 + 93,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 122,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                611 + 100,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 129,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                611 + 107,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 136,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                611 + 114,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 143,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.featured[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(
              611,
              200 + 298 * (i - (i1Featured + i2Featured)),
              268,
              268
            );
            const grd = ctx.createRadialGradient(
              611 + 3 + (268 - 3 * 2) / 2,
              200 +
                298 * (i - (i1Featured + i2Featured)) +
                3 +
                (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 611 + 3,
              (268 - 3 * 2) / 2 +
                200 +
                298 * (i - (i1Featured + i2Featured)) +
                3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              611 + 3,
              200 + 298 * (i - (i1Featured + i2Featured)) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.icon
            );
            ctx.drawImage(
              item,
              611 + 3,
              200 + 3 + 298 * (i - (i1Featured + i2Featured)),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(
              611 + 3,
              200 + 192 + 298 * (i - (i1Featured + i2Featured)),
              262,
              73
            );
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.featured[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.featured[i].name,
              611 + 134,
              200 + 192 + 32 + 298 * (i - (i1Featured + i2Featured))
            );
            let price = shop.data.featured[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(
                shop.data.featured[i].priceIconLink
              );
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                611 + 93,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 122,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                611 + 100,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 129,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                611 + 107,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 136,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                611 + 114,
                200 + 192 + 42 + 298 * (i - (i1Featured + i2Featured)),
                25,
                25
              );
              ctx.fillText(
                shop.data.featured[i].price,
                611 + 143,
                200 + 192 + 65 + 298 * (i - (i1Featured + i2Featured))
              );
            }
          }
        }
        for (let i = 0; i < i1Daily; i++) {
          if (shop.data.daily[i].images.daily) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(939, 200 + 298 * i, 268, 268);
            const grd = ctx.createRadialGradient(
              939 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * i + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 939 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * i + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(939 + 3, 200 + 298 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

            let item = await Canvas.loadImage(
              shop.data.featured[i].images.featured
            );
            ctx.drawImage(item, 939 + 3, 200 + 3 + 298 * i, 262, 262);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(939 + 3, 200 + 192 + 298 * i, 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              939 + 134,
              200 + 192 + 32 + 298 * i
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(vbuck, 939 + 93, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 122,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(vbuck, 939 + 100, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 129,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(vbuck, 939 + 107, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 136,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(vbuck, 939 + 114, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 143,
                200 + 192 + 65 + 298 * i
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(939, 200 + 298 * i, 268, 268);
            const grd = ctx.createRadialGradient(
              939 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * i + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 939 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * i + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(939 + 3, 200 + 298 * i + 3, 268 - 3 * 2, 268 - 3 * 2);

            let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
            ctx.drawImage(item, 939 + 3, 200 + 3 + 298 * i, 262, 262);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(939 + 3, 200 + 192 + 298 * i, 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              939 + 134,
              200 + 192 + 32 + 298 * i
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(vbuck, 939 + 93, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 122,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(vbuck, 939 + 100, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 129,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(vbuck, 939 + 107, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 136,
                200 + 192 + 65 + 298 * i
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(vbuck, 939 + 114, 200 + 192 + 42 + 298 * i, 25, 25);
              ctx.fillText(
                shop.data.daily[i].price,
                939 + 143,
                200 + 192 + 65 + 298 * i
              );
            }
          }
        }
        for (let i = i1Daily; i < i1Daily + i2Daily; i++) {
          if (shop.data.daily[i].images.daily) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(1237, 200 + 298 * (i - i1Daily), 268, 268);
            const grd = ctx.createRadialGradient(
              1237 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - i1Daily) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 1237 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - i1Daily) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              1237 + 3,
              200 + 298 * (i - i1Daily) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
            ctx.drawImage(
              item,
              1237 + 3,
              200 + 3 + 298 * (i - i1Daily),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(1237 + 3, 200 + 192 + 298 * (i - i1Daily), 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              1237 + 134,
              200 + 192 + 32 + 298 * (i - i1Daily)
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                1237 + 93,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 122,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                1237 + 100,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 129,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                1237 + 107,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 136,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                1237 + 114,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 143,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(1237, 200 + 298 * (i - i1Daily), 268, 268);
            const grd = ctx.createRadialGradient(
              1237 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - i1Daily) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 1237 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - i1Daily) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              1237 + 3,
              200 + 298 * (i - i1Daily) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
            ctx.drawImage(
              item,
              1237 + 3,
              200 + 3 + 298 * (i - i1Daily),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(1237 + 3, 200 + 192 + 298 * (i - i1Daily), 262, 73);
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              1237 + 134,
              200 + 192 + 32 + 298 * (i - i1Daily)
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                1237 + 93,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 122,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                1237 + 100,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 129,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                1237 + 107,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 136,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                1237 + 114,
                200 + 192 + 42 + 298 * (i - i1Daily),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1237 + 143,
                200 + 192 + 65 + 298 * (i - i1Daily)
              );
            }
          }
        }
        for (let i = i1Daily + i2Daily; i < i1Daily + i2Daily + i3Daily; i++) {
          if (shop.data.daily[i].images.daily) {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(1535, 200 + 298 * (i - (i1Daily + i2Daily)), 268, 268);
            const grd = ctx.createRadialGradient(
              1535 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - (i1Daily + i2Daily)) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 1535 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - (i1Daily + i2Daily)) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              1535 + 3,
              200 + 298 * (i - (i1Daily + i2Daily)) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(shop.data.daily[i].images.daily);
            ctx.drawImage(
              item,
              1535 + 3,
              200 + 3 + 298 * (i - (i1Daily + i2Daily)),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(
              1535 + 3,
              200 + 192 + 298 * (i - (i1Daily + i2Daily)),
              262,
              73
            );
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              1535 + 134,
              200 + 192 + 32 + 298 * (i - (i1Daily + i2Daily))
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                1535 + 93,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 122,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                1535 + 100,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 129,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                1535 + 107,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 136,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                1535 + 114,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 143,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
          } else {
            const { colorBorder, colorCenter, colorExt } = rarityCard(
              shop.data.daily[i].rarity
            );
            ctx.fillStyle = colorBorder;
            ctx.fillRect(1535, 200 + 298 * (i - (i1Daily + i2Daily)), 268, 268);
            const grd = ctx.createRadialGradient(
              1535 + 3 + (268 - 3 * 2) / 2,
              200 + 298 * (i - (i1Daily + i2Daily)) + 3 + (268 - 3 * 2) / 2,
              4,
              (268 - 3 * 2) / 2 + 1535 + 3,
              (268 - 3 * 2) / 2 + 200 + 298 * (i - (i1Daily + i2Daily)) + 3,
              (268 - 3 * 2) * 0.8
            );
            grd.addColorStop(0, colorCenter);
            grd.addColorStop(1, colorExt);
            ctx.fillStyle = grd;
            ctx.fillRect(
              1535 + 3,
              200 + 298 * (i - (i1Daily + i2Daily)) + 3,
              268 - 3 * 2,
              268 - 3 * 2
            );

            let item = await Canvas.loadImage(shop.data.daily[i].images.icon);
            ctx.drawImage(
              item,
              1535 + 3,
              200 + 3 + 298 * (i - (i1Daily + i2Daily)),
              262,
              262
            );
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#000000";
            ctx.fillRect(
              1535 + 3,
              200 + 192 + 298 * (i - (i1Daily + i2Daily)),
              262,
              73
            );
            ctx.globalAlpha = 1;
            ctx.font = applyText(
              canvas,
              shop.data.daily[i].name,
              38,
              260,
              "luckiest guy"
            );
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(
              shop.data.daily[i].name,
              1535 + 134,
              200 + 192 + 32 + 298 * (i - (i1Daily + i2Daily))
            );
            let price = shop.data.daily[i].price.replace(/[,]/gi, ""),
              vbuck = await Canvas.loadImage(shop.data.daily[i].priceIconLink);
            ctx.textAlign = "left";
            ctx.font = "30px luckiest guy";
            if (price >= 1000) {
              ctx.drawImage(
                vbuck,
                1535 + 93,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 122,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 100 && price < 1000) {
              ctx.drawImage(
                vbuck,
                1535 + 100,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 129,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 10 && price < 100) {
              ctx.drawImage(
                vbuck,
                1535 + 107,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 136,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
            if (price >= 0 && price < 10) {
              ctx.drawImage(
                vbuck,
                1535 + 114,
                200 + 192 + 42 + 298 * (i - (i1Daily + i2Daily)),
                25,
                25
              );
              ctx.fillText(
                shop.data.daily[i].price,
                1535 + 143,
                200 + 192 + 65 + 298 * (i - (i1Daily + i2Daily))
              );
            }
          }
        }
      }

      await fs.writeFileSync(path, canvas.toBuffer());

      return path;
    }
  }
};
