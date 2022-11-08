const { MessageEmbed } = require('discord.js')
const help = require('../commands/info/help')
const infoCmds = require('../commands/info/infoCmds')
const mute = require('../commands/moderation/mute')
const promo = require('../commands/promo')
const { colors } = require('../info')

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
      embed = promo(args)
      break
    case 'mute':
      embed = mute(args)
    case 'ban':
      embed = ban(args)
    default:
      if (parsedMessage.command in infoCmds) {
        embed = infoCmds[parsedMessage.command]
      } else {
        embed = new MessageEmbed().setColor(colors.blue).setTitle('Error').setDescription('Invalid command, use .help')
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
