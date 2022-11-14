/**
 * This is the source code for Alpinebot

 * Alpinebot is a moderation tool specifically designed for the Alpine Esports Discord community
 * It is intended to keep the community up to the standards of Alpine Esports as well as keep it safe
 * 
 * Created by: Jarod Kafka (Quack) and Schon Hale (Schon)
 * Version Beta
 */

//Setup
const info = require('./info')
const Discord = require('discord.js')
const memberAddLogger = require('./loggers/member-add-logger')
const memberRemoveLogger = require('./loggers/member-remove-logger')
const memberUpdateLogger = require('./loggers/member-update-logger')
const messageDeleteLogger = require('./loggers/message-delete-logger')
const messageUpdateLogger = require('./loggers/message-update-logger')
const channelCreateLogger = require('./loggers/channel-create-logger')
const channelDeleteLogger = require('./loggers/channel-delete-logger')
const roleCreateLogger = require('./loggers/role-create-logger')
const roleDeleteLogger = require('./loggers/role-delete-logger')
const roleUpdateLogger = require('./loggers/role-update-logger')
const reactionAddLogger = require('./loggers/reaction-add-logger')
const reactionRemoveLogger = require('./loggers/reaction-remove-logger')
const { sendWelcome, updateMemberCount } = require('./tools/utils')
const autoMod = require('./skills/auto-mod')
const { handleMessage } = require('./skills/message-handler')
const bot = new Discord.Client({ partials: Object.values(Discord.Constants.PartialTypes) })

/**
 * This logs to the console that the bot is online, and sets its appearance in the discord server
 */
bot.on('ready', async () => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity('#GOPINE!!')

  const server = bot.guilds.cache.get(info.main_server)
  for (const key in info.channels) {
    info.channels[key] = server.channels.cache.get(info.channels[key])
  }
  for (const key in info.categories) {
    info.categories[key] = server.channels.cache.get(info.categories[key])
  }
  for (const key in info.emotes) {
    for (const emoji in info.emotes[key]) {
      info.emotes[key][emoji] = server.emojis.cache.get(info.emotes[key][emoji])
    }
  }
})

/**
 * This code runs whenever there is a message sent in the discord server
 * Does not run when message sent by another bot, or if in DM
 */
bot.on('message', (message) => {
  handleMessage(message)
  autoMod(message, message.author)
})

bot.on('guildMemberAdd', (member) => {
  memberAddLogger(member)
  sendWelcome(member)
  updateMemberCount(member)
})
bot.on('guildMemberRemove', (member) => {
  memberRemoveLogger(member)
  updateMemberCount(member)
})
bot.on('guildMemberUpdate', (oldMember, newMember) => memberUpdateLogger(oldMember, newMember))
bot.on('messageDelete', async (message) => messageDeleteLogger(message))
bot.on('messageUpdate', async (oldMessage, newMessage) => {
  messageUpdateLogger(oldMessage, newMessage)
  autoMod(newMessage, newMessage.author)
})
bot.on('channelCreate', (channel) => channelCreateLogger(channel))
bot.on('channelDelete', async (channel) => channelDeleteLogger(channel))
bot.on('roleCreate', (role) => roleCreateLogger(role))
bot.on('roleDelete', (role) => roleDeleteLogger(role))
bot.on('roleUpdate', (oldRole, newRole) => roleUpdateLogger(oldRole, newRole))
bot.on('messageReactionAdd', async (reaction, user) => reactionAddLogger(reaction, user))
bot.on('messageReactionRemove', async (reaction, user) => reactionRemoveLogger(reaction, user))

bot.login(info.token)
