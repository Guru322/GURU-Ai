global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "Curse Spirit Grade 4", level: -1 },
      { name: "Common human", level: 0 },
      { name: "New Born Sorcerer", level: 5 }, //»»————⍟——««\n
      { name: "Grade 4 sorcerer", level: 10 },
      { name: "Grade 3 sorcerer", level: 15 },
      { name: "😎 Semi grade 2 sorcerer", level: 20 },
      { name: "⚔ Grade 2 sorcerer", level: 25 }, //𐏓・,〔𒁷, 𒆜〢
      { name: "🕴🏻 Semi grade 1 sorcerer", level: 30 },
      { name: "⚕️ Grade 1 sorcerer", level: 35 },
      { name: "🐉 Special Grade sorcerer", level: 40 },
      { name: "🥷🏻 Rouge Special grade sorcerer", level: 45 },
      { name: "🧙🏻‍♂️ Jujutsu higher up", level: 50 },
      { name: "😈 Master of the Zen'in clan,wielder of 10 shadow technique", level: 60 },
      { name: "🤞🏻💫 Master of Satoru clan,wielder of the six eye and limitless", level: 70 },
      { name: "🔮 Vessel of Abomination", level: 80 },
      { name: "👑KING OF CURSES AND MASTER OF JUJUTSU👑", level: 100 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
