const discord = require('discord.js')
const info = require('../info')
const help = require('../commands/info/help')
const infoCmds = require('../commands/info/infoCmds')

function isCommand(str) {
  return str[0] == '.'
}
function parseMessage(message) {
  const messageArray = message.content.toLowerCase().split(' ')
  messageArray[0] = messageArray[0].substring(1)
  return {
    command: messageArray[0],
    args: messageArray.slice(1),
  }
}
function handleMessage(message) {
  if (message.channel.type === 'dm') return
  if (message.author.bot) return
  if (!isCommand(message.content)) return
  if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
    autoMod(message, message.author)
  }
  const parsedMessage = parseMessage(message)
  const args = parsedMessage.args
  let embed
  switch (parsedMessage.command) {
    case 'help':
      embed = help(args)
      break
    case 'promo':
      let retVal = ''
      if (args[0].toLowerCase() === 'weekly' || args[0].toLowerCase() === 'w') {
        if (args[1].toLowerCase() === 'tonight') {
          retVal +=
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
          retVal +=
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
          retVal +=
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
          retVal +=
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
        const embed = new discord.MessageEmbed()
          .setColor(info.colors['green'])
          .setDescription('Format: .promo [(weekly/w) / (avalanche/a)] (month) (day)')
        message.channel.send(embed)
        return
      }
      channel['trial_announcements']
        .send(retVal)
        .then((msg) => {
          msg.react('✅')
          msg.react('🇽')
        })
        .then((thing) => {
          embed
            .setColor(color['pink'])
            .setDescription('Please react to [this message](' + msgURL + ') to confirm or cancel the announcement.')
          message.channel.send(embed)
        })
      break
    default:
      if (parsedMessage.command in infoCmds) {
        embed = infoCmds[parsedMessage.command]
      } else {
        embed = new discord.MessageEmbed()
          .setColor(info.colors['blue'])
          .setTitle('Error')
          .setDescription('Invalid command, use .help')
      }
      break
  }
  message.channel.send(embed)
}
module.exports = {
  handleMessage: handleMessage,
  parseMessage: parseMessage,
  isCommand: isCommand,
}
