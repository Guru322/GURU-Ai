global.rpg = {
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }

    const role = [
      { name: 'Tadpole', level: 0 },
      { name: 'Lobster Larva', level: 5 }, //»»————⍟——««\n
      { name: 'Octopus Apprentice', level: 10 },
      { name: "Siren's Apprentice", level: 15 },
      { name: '🐬 Dolphin Diplomat', level: 20 },
      { name: '🥷 Sea Serpent Tamer', level: 25 }, //𐏓・,〔𒁷, 𒆜〢
      { name: '⚔ Kraken Hunter', level: 30 },
      { name: '👑 Sea King', level: 35 },
      { name: "🪼 Neptune's Protege", level: 40 },
      { name: '🐍 Abyssal Ambassador', level: 45 },
      { name: '👹 Guardian of the Abyss', level: 50 },
      { name: '🧙‍♂️ Deep Sea Sage', level: 60 },
      { name: '🧝‍♂️ Master of Atlantis', level: 70 },
      { name: '🐲 Legendary Leviathan', level: 80 },
      { name: '🔮 Ocean Overlord 🔮', level: 90 },
      { name: '🔱 Emperor of the Seven Seas 🔱', level: 100 },
    ]

    return role.reverse().find(role => level >= role.level)
  },
}
