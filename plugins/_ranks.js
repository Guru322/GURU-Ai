global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "Känckebrot", level: 0 },
      { name: "Anfänger", level: 5 }, //»»————⍟——««\n
      { name: "katzen fleisch", level: 10 },
      { name: "hunde fleisch", level: 15 },
      { name: "kek24", level: 20 },
      { name: "🥷 deutsche DB ist zu spät", level: 25 }, //𐏓・,〔𒁷, 𒆜〢
      { name: "⚔ geh kacken", level: 30 },
      { name: "👑 Technoblade", level: 35 },
      { name: "🪼 kauf in kaufland", level: 40 },
      { name: "🐍 wir sind im lidell", level: 45},
      { name: "👹 chippi chippi chappa chapäa", level: 50 },
      { name: "🧙‍♂️ klau nicht", level: 60 },
      { name: "🧝‍♂️ neger", level: 70 },
      { name: "🐲 fischiiii", level: 80 },
      { name: "🔮 katoffel salat🔮", level: 90 },
      { name: "🔱 master 100 🔱", level: 100 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
