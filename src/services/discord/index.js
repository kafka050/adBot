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
const messageHandler = require('./skills/messageHandler')
const ms = require('ms')
const { linkBlacklist } = require('./info')
const memberAddLogger = require('./loggers/memberAddLogger')
const memberRemoveLogger = require('./loggers/memberRemoveLogger')
const memberUpdateLogger = require('./loggers/memberUpdateLogger')
const messageDeleteLogger = require('./loggers/messageDeleteLogger')
const messageUpdateLogger = require('./loggers/messageUpdateLogger')
const channelCreateLogger = require('./loggers/channelCreateLogger')
const channelDeleteLogger = require('./loggers/channelDeleteLogger')
const roleCreateLogger = require('./loggers/roleCreateLogger')
const roleDeleteLogger = require('./loggers/roleDeleteLogger')
const roleUpdateLogger = require('./loggers/roleUpdateLogger')
const reactionAddLogger = require('./loggers/reactionAddLogger')
const reactionRemoveLogger = require('./loggers/reactionRemoveLogger')
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
bot.on('message', async (message) => messageHandler.handleMessage(message))

/**
 * Logs
 */

bot.on('guildMemberAdd', (member) => memberAddLogger(member))
bot.on('guildMemberRemove', (member) => memberRemoveLogger(member))
bot.on('guildMemberUpdate', (oldMember, newMember) => memberUpdateLogger(oldMember, newMember))
bot.on('messageDelete', async (message) => messageDeleteLogger(message))
bot.on('messageUpdate', async (oldMessage, newMessage) => messageUpdateLogger(oldMessage, newMessage))
bot.on('channelCreate', (channel) => channelCreateLogger(channel))
bot.on('channelDelete', async (channel) => channelDeleteLogger(channel))
bot.on('roleCreate', (role) => roleCreateLogger(role))
bot.on('roleDelete', (role) => roleDeleteLogger(role))
bot.on('roleUpdate', (oldRole, newRole) => roleUpdateLogger(oldRole, newRole))
bot.on('messageReactionAdd', async (reaction, user) => reactionAddLogger(reaction, user))
bot.on('messageReactionRemove', async (reaction, user) => reactionRemoveLogger(reaction, user))

bot.login(info.token)
