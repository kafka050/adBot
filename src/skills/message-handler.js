const { Message } = require('discord.js')
const help = require('../commands/info/help')
const infoCmds = require('../commands/info/info-cmds')
const ban = require('../commands/moderation/ban')
const mute = require('../commands/moderation/mute')
const promo = require('../commands/promo')
const { colors, prefix } = require('../info')
const { sendMessage } = require('../tools/utils')

/**
 * Determines if a message is a command
 * @param {String} str message to check
 * @returns boolean: true if str is a command
 */
function isCommand(str) {
  return str[0] == prefix
}

/**
 * Splits messages into command and args
 * @param {Message} message
 * @returns command and arguments
 */
function parseMessage(message) {
  const messageArray = message.content.toLowerCase().split(' ')
  messageArray[0] = messageArray[0].substring(1)
  return {
    command: messageArray[0],
    args: messageArray.slice(1),
  }
}

/**
 * Determines what actions to take on any new message
 * @param {Message} message message to deal with
 */
async function handleMessage(message) {
  if (message.channel.type === 'dm') return
  if (message.author.bot) return
  if (!isCommand(message.content)) return
  const parsedMessage = parseMessage(message)
  const args = parsedMessage.args
  let embed = {}
  switch (parsedMessage.command) {
    case 'help':
      embed = help(args)
      break
    case 'promo':
      embed = promo(args)
      break
    case 'mute':
      embed = await mute(message, args)
      break
    case 'ban':
      embed = await ban(message, args)
      break
    default:
      if (parsedMessage.command in infoCmds) {
        embed = infoCmds[parsedMessage.command]
      } else {
        embed = {
          color: colors.blue,
          title: 'Error',
          description: 'Invalid command, use .help',
        }
      }
      break
  }
  if (!embed) return
  sendMessage({ embeds: [embed] }, message.channel)
}
module.exports = {
  handleMessage: handleMessage,
  parseMessage: parseMessage,
  isCommand: isCommand,
}
