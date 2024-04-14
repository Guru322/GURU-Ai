import pkg from '@whiskeysockets/baileys'
const { WA_DEFAULT_EPHEMERAL } = pkg
const handler = async (m, { conn, args, usedPrefix }) => {
  const validValues = {
    lastseen: ['all', 'contacts', 'contact_blacklist', 'none'],
    online: ['all', 'match_last_seen'],
    picture: ['all', 'contacts', 'contact_blacklist', 'none'],
    status: ['all', 'contacts', 'contact_blacklist', 'none'],
    readreceipts: ['all', 'none'],
    groupsadd: ['all', 'contacts', 'contact_blacklist', 'none'],
    disappearingmode: [WA_DEFAULT_EPHEMERAL, 0, 86400, 604800, 7776000],
  }

  const typeNumber = parseInt(args[0])
  const valueNumber = parseInt(args[1])

  const typeKeys = Object.keys(validValues)

  const privacyTypes = Object.keys(validValues)
    .map((type, index) => `${index + 1}. ${type}`)
    .join('\n')
  const helpMessage =
    `How to use? : ${usedPrefix}setprivacy [type_number] [value_number]\n\n` +
    'List Options:\n' +
    privacyTypes

  if (!typeNumber || isNaN(typeNumber) || typeNumber < 1 || typeNumber > typeKeys.length) {
    m.reply(helpMessage)
    return
  }

  const selectedType = typeKeys[typeNumber - 1]
  const validTypeValues = validValues[selectedType]

  const validTypeValuesList = validTypeValues
    .map((type, index) => `${index + 1}. ${type}`)
    .join('\n')
  const typeHelpMessage =
    `How to use: ${usedPrefix}setprivacy [type_number] [value_number]\n\n` +
    'List Options:\n' +
    validTypeValuesList

  if (
    !valueNumber ||
    isNaN(valueNumber) ||
    valueNumber < 1 ||
    valueNumber > validTypeValues.length
  ) {
    m.reply(typeHelpMessage)
    return
  }

  const selectedValue = validTypeValues[valueNumber - 1]

  const privacyType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1)

  switch (selectedType) {
    case 'lastseen':
      await conn
        .updateLastSeenPrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'online':
      await conn
        .updateOnlinePrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'picture':
      await conn
        .updateProfilePicturePrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'status':
      await conn
        .updateStatusPrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'readreceipts':
      await conn
        .updateReadReceiptsPrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'groupsadd':
      await conn
        .updateGroupsAddPrivacy(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    case 'disappearingmode':
      await conn
        .updateDefaultDisappearingMode(selectedValue)
        .then(() => {
          m.reply(`Privacy ${privacyType} has been changed to ${selectedValue}`)
        })
        .catch(() => {
          m.reply(`Cannot change privacy ${privacyType}`)
        })
      break
    default:
      m.reply(typeHelpMessage)
  }
}

handler.help = ['setprivacy']
handler.tags = ['main']
handler.command = /^(setprivacy)$/i
handler.owner = true

export default handler
