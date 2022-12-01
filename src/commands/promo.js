// NOT DONE
const { colors, channels } = require('../info')
const { sendTrial } = require('../skills/promotion/send-trial')

/**
 * Formats and sends announcement message for review by admins
 * @param {String[]} args {'w'/'a' | 'weekly'/'avalanche'} {'tonight' | [Month] [Date]}
 * @returns an embed
 */
module.exports = (args) => {
  let announcement = ''
  if (args[0].toLowerCase() === 'weekly' || args[0].toLowerCase() === 'w') {
    if (args[1].toLowerCase() === 'tonight') {
      announcement +=
        `__**Alpine’s** $50 **3v3 Tournament**!__\n` +
        `Alpine invites **you** to compete **TONIGHT** for your shot at becoming our Tournament Champion and taking home **$50**. Grab your team and get ready!\n\n` +
        `**Sign up here:** https://smash.gg/alpine\n\n` +
        `➤  Prize: __**$50**__\n\n` +
        `➤  Double elimination\n\n` +
        `➤  **Date & Time:** Tonight at **7:00 pm ET**\n` +
        `*Registration ends at 6:30 pm ET (30 minutes prior)*\n\n` +
        `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n` +
        `➤  **Servers:** NA East\n\n` +
        `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n` +
        `➤ **You must join our discord** https://discord.gg/JeY7z9q`
    } else {
      announcement +=
        `__**Alpine’s** $50 **3v3 Tournament**!__\n` +
        `Alpine invites **you** to compete this **Friday** for your shot at becoming our Tournament Champion and taking home **$50**. Grab your team and get ready!\n\n` +
        `**Sign up here:** https://smash.gg/alpine\n\n` +
        `➤  Prize: __**$50**__\n\n` +
        `➤  Double elimination\n\n` +
        `➤  **Date & Time:** Friday, ` +
        args[1] +
        ` ` +
        args[2] +
        ` at **7:00 pm ET**\n` +
        `*Registration ends at 6:30 pm ET (30 minutes prior)*\n\n` +
        `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n` +
        `➤  **Servers:** NA East\n\n` +
        `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n` +
        `➤ **You must join our discord** https://discord.gg/JeY7z9q`
    }
  } else if (args[0].toLowerCase() === 'avalanche' || args[0].toLowerCase() === 'a') {
    if (args[1].toLowerCase() === 'tonight') {
      announcement +=
        `__**AVALANCHE $300 TOURNAMENT by Alpine Esports**__\n` +
        `An avalanche is coming **TONIGHT**! Get ready to compete in Alpine’s largest tournament for your shot at taking home our biggest prize and becoming our **Avalanche Champion**!\n` +
        `From everyone at Alpine, we wish you the best of luck and can’t wait to see you all out there!\n\n` +
        `**Sign up here:** https://smash.gg/avalanche\n\n` +
        `➤  Prize Pool: __**$300**__\n` +
        `	 ➤ 1st: $165\n` +
        `	 ➤ 2nd: $90\n` +
        `	 ➤ 3rd: $45\n\n` +
        `➤  **Date & Time:** Tonight at **8:00 pm ET**\n` +
        `*Registration ends at 7:30 pm ET (30 minutes prior)*\n\n` +
        `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n` +
        `➤  **Servers:** NA East\n\n` +
        `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n` +
        `➤ **You must join our discord:** https://discord.gg/JeY7z9q`
    } else {
      announcement +=
        `__**AVALANCHE $300 TOURNAMENT by Alpine Esports**__\n` +
        `An avalanche is coming **THIS FRIDAY**! Get ready to compete in Alpine’s largest tournament for your shot at taking home our biggest prize and becoming our **Avalanche Champion**!\n` +
        `From everyone at Alpine, we wish you the best of luck and can’t wait to see you all out there!\n\n` +
        `**Sign up here:** https://smash.gg/avalanche\n\n` +
        `➤  Prize Pool: __**$300**__\n` +
        `	 ➤ 1st: $165\n` +
        `	 ➤ 2nd: $90\n` +
        `	 ➤ 3rd: $45\n\n` +
        `➤  **Date & Time:** Friday, ` +
        args[1] +
        ` ` +
        args[2] +
        ` at **8:00 pm ET**\n` +
        `*Registration ends at 7:30 pm ET (30 minutes prior)*\n\n` +
        `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n` +
        `➤  **Servers:** NA East\n\n` +
        `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n` +
        `➤ **You must join our discord:** https://discord.gg/JeY7z9q`
    }
  } else {
    const embed = {
      color: colors.green,
      description: 'Format: .promo [(weekly/w) / (avalanche/a)] (month) (day)',
    }
    return embed
  }
  sendTrial(announcement)
  return {
    color: colors.pink,
    description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
  }
}
