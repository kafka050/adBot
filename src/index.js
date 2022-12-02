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
const { Client, Events, Partials, GatewayIntentBits } = require('discord.js')
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
const { sendWelcome, updateMemberCount, sendMessage } = require('./tools/utils')
const autoMod = require('./skills/auto-mod')
const { handleMessage } = require('./skills/message-handler')
const { channels, colors } = require('./info')
const { reactionAdd } = require('./skills/reaction-handler')
const bot = new Client({
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.User],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

/**
 * This logs to the console that the bot is online, and sets its appearance in the discord server
 */
bot.on('ready', async (thing) => {
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
bot.on(Events.MessageCreate, async (message) => {
  console.log('Received message.')
  await handleMessage(message)
  autoMod(message, message.author)
})
bot.on(Events.MessageDelete, async (message) => {
  console.log('Message deleted')
  const logEmbed = await messageDeleteLogger(message)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
  console.log('Message updated.')
  const logEmbed = await messageUpdateLogger(oldMessage, newMessage)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
  autoMod(newMessage, newMessage.author)
})

bot.on(Events.GuildMemberAdd, async (member) => {
  console.log('Member joined')
  sendWelcome(member)
  updateMemberCount(member)
  const logEmbed = memberAddLogger(member)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.GuildMemberRemove, async (member) => {
  console.log('Member left')
  updateMemberCount(member)
  const logEmbed = await memberRemoveLogger(member)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  console.log('Member updated')
  const logEmbed = await memberUpdateLogger(oldMember, newMember)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})

bot.on(Events.ChannelCreate, async (channel) => {
  console.log('Channel created')
  const logEmbed = channelCreateLogger(channel)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.ChannelDelete, async (channel) => {
  console.log('Channel deleted')
  const logEmbed = await channelDeleteLogger(channel)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})

bot.on(Events.GuildRoleCreate, async (role) => {
  console.log('Role created')
  const logEmbed = roleCreateLogger(role)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.GuildRoleDelete, async (role) => {
  console.log('Role deleted')
  const logEmbed = roleDeleteLogger(role)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})
bot.on(Events.GuildRoleUpdate, async (oldRole, newRole) => {
  console.log('Role updated')
  const logEmbed = roleUpdateLogger(oldRole, newRole)
  if (!logEmbed) return
  await sendMessage({ embeds: [logEmbed] }, channels.logs)
})

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
  console.log('Reaction added')
  await reactionAdd(reaction, user)
})

bot.login(info.token)
