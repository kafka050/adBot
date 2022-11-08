/**
 * This is the source code for Alpinebot

 * Alpinebot is a moderation tool specifically designed for the Alpine Esports Discord community
 * It is intended to keep the community up to the standards of Alpine Esports as well as keep it safe
 * 
 * Created by: Jarod Kafka (Quack) and Schon Hale (Schon)
 * Version Alpha
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
 *
 * Contains logging for:
 * Member join
 * Member leave
 * Member role change
 * Message delete
 * Message edit
 * Channel create
 * Channel delete
 * Role create
 * Role delete
 * Role modification
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

/**
 * Automod
 *
 * Punishes for blacklisted phrases/links
 * Warns for mass mentions
 */
function autoMod(message, author) {
  /**userLength = message.mentions.users.array().length
	roleLength = message.mentions.roles.array().length
	if(userLength > 3 || roleLength > 2 || (userLength+roleLength) > 3) {
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setTitle("Mass Mention")
			.setColor(color['green'])
			.setDescription(message.member.toString() + " mass mentioned users/roles.")
		channel['logs'].send("<@&"+roleID['admin']+"> - Review mass mention for possible mute/ban")
		channel['logs'].send(embed)
		
		const embed2 = new Discord.MessageEmbed()
			.setColor(color['orange'])
			.setTitle("Warning")
			.setDescription("Please do not mass mention users. Doing so may result in mute or ban.")
			.setFooter("Alpine AutoMod")
		dmMember(author, embed2)
		message.channel.send(embed2)
		return
	}*/
  info.categoriesWhitelist = [
    info.categories['admin'],
    info.categories['staff'],
    info.categories['community_teams'],
    info.categories['information'],
  ]
  if (categoryWhitelist.includes(message.channel.parent)) return
  if (
    message.content.toLowerCase().includes('steamcommunity') ||
    message.content.toLowerCase().includes('steampowered') ||
    message.content.toLowerCase().includes('imgur')
  )
    return
  if (
    message.channel === channel['community_clips'] &&
    (message.content.toLowerCase().includes('gifyourgame') ||
      message.content.toLowerCase().includes('imgur') ||
      message.content.toLowerCase().includes('gfycat') ||
      message.content.toLowerCase().includes('clips.twitch'))
  )
    return
  if (message.content.toLowerCase().includes('tracker')) return
  if (message.member.roles.highest.position >= message.guild.roles.cache.get(roleID['staff']).position) return
  for (const key in wordBlacklist) {
    if (message.content.toLowerCase().includes(key)) {
      mute(message, author, wordBlacklist[key], "Message included blacklisted phrase: '" + key + "'")
      message.delete()
      return
    }
  }
  for (const link of linkBlacklist) {
    if (message.content.toLowerCase().includes('@') && message.content.toLowerCase().includes(link)) {
      const embed = new Discord.MessageEmbed()
        .setColor(color['blue'])
        .setDescription("For your safety, don't post emails.")
      dmMember(author, embed)
      message.delete()
    }
  }
}
/**
 * Functions!
 * Get your functions here!
 */
/**
 * Mutes 'person' for a specified amount of time, DM's 'person', logs the mute
 * @param {*} message Message Object
 * @param {*} person GuildMember or User Object, person to mute
 * @param {*} time Optional String, Duration of ban (s, m, h, d, w, y), time of mute
 * @param {*} reason Optional String, reason for mute
 */
function mute(message, person, time, reason) {
  let author = message.author
  let role = message.guild.roles.fetch((r) => r.id === roleID['muted'])
  if (person.type != 'GuildMember') {
    person = message.guild.member(person)
  }
  let newMessage = ''
  if (message.content.length > 1000) {
    for (let i = 0; i < 750; i++) {
      newMessage += message.content.charAt(i)
    }
    message.content = newMessage
  }
  if (person.roles.highest.position >= message.guild.roles.cache.get(roleID['staff']).position) return
  if (author.id === person.id) {
    author = 'AutoMod'
  } else {
    author = `<@` + message.author.id + `>`
  }
  if (!person) {
    const embed = new Discord.MessageEmbed().setColor(color['blue']).addField(`Error`, 'Could not find user ' + person)
    return message.channel.send(embed)
  }
  if (!role) {
    const embed = new Discord.MessageEmbed().setColor(color['blue']).addField(`Error`, 'Could not find the muted role.')
    return message.channel.send(embed)
  }
  if (time === '1y' || time === '365d') {
    channel['punishments'].send('<@&' + roleID['admin'] + '> Please review the following mute for possible ban.')
  }
  person.roles.add(roleID['muted'])

  if (!time) {
    time = '24h'
  }
  if (!reason) {
    reason = 'No reason provided.'
  }
  if (author === 'AutoMod') {
    if (time === '365d' || time === '1y') {
      const embed = new Discord.MessageEmbed()
        .setAuthor(person.user.tag, person.user.avatarURL())
        .setColor(color['red'])
        .setTitle('User Muted')
        .setThumbnail(image['ibex']['red'])
        .addField('Duration', `Indefinite, message under review.`)
        .addField('Muted By', author)
        .addField(`Message: `, message)
        .setFooter('User ID: ' + person.id)
      channel['punishments'].send(embed)
      const embed2 = new Discord.MessageEmbed()
        .setColor(color['red'])
        .setTitle('You have been muted')
        .setThumbnail(image['ibex']['red'])
        .addField(`Duration`, `Indefinite, message under review.`)
        .addField(`Reason`, reason)
        .addField(`Message`, message)
        .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
      person.user.send(embed2)
      return
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(person.user.tag, person.user.avatarURL())
      .setColor(color['red'])
      .setTitle('User Muted')
      .setThumbnail(image['ibex']['red'])
      .addField('Duration', `${ms(ms(time))}`)
      .addField('Muted By', author)
      .addField(`Message: `, message)
      .setFooter('User ID: ' + person.id)
    channel['punishments'].send(embed)
    const embed2 = new Discord.MessageEmbed()
      .setColor(color['red'])
      .setTitle('You have been muted')
      .setThumbnail(image['ibex']['red'])
      .addField(`Duration`, `${ms(ms(time))}`)
      .addField(`Reason`, reason)
      .addField(`Message`, message)
      .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
    person.user.send(embed2)
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(person.user.tag, person.user.avatarURL())
      .setColor(color['red'])
      .setTitle('User Muted')
      .setThumbnail(image['ibex']['red'])
      .addField('Duration', `${ms(ms(time))}`)
      .addField('Muted By', author)
      .addField(`Reason`, reason)
      .setFooter('User ID: ' + person.id)
    channel['punishments'].send(embed)
    const embed2 = new Discord.MessageEmbed()
      .setColor(color['red'])
      .setTitle('You have been muted')
      .setThumbnail(image['ibex']['red'])
      .addField(`Duration`, `${ms(ms(time))}`)
      .addField(`Reason`, reason)
      .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
    person.user.send(embed2)
  }

  setTimeout(function () {
    if (person.roles.cache.get(roleID['muted']) === undefined) {
      return
    }
    person.roles.remove(roleID['muted'])
    const embed = new Discord.MessageEmbed()
      .setColor(color['red'])
      .setDescription(`<@` + person.id + `> has been **unmuted**.`)
    channel['punishments'].send(embed)
  }, ms(time))
}
/**
 * Bans 'person', DM's 'person', logs ban
 * @param {*} message Message Object
 * @param {*} person GuildMember Object, person to ban
 * @param {*} reason Required String, reason for ban
 */
function ban(message, person, reason) {
  if (!person) {
    const embed = new Discord.MessageEmbed().setColor(color['blue']).addField(`Error`, 'Could not find user ' + person)
    return message.channel.send(embed)
  }
  const embed2 = new Discord.MessageEmbed()
    .setColor(color['red'])
    .setTitle('You have been banned from Alpine Esports')
    .setThumbnail(image['ibex']['red'])
    .addField(`Reason`, reason)
  dmMember(person, embed2)

  setTimeout(function () {
    person.ban(reason)
  }, 5000)

  const banEmbed = new Discord.MessageEmbed()
    .setColor(color['red'])
    .setTitle('Ban')
    .setThumbnail(image['ibex']['red'])
    .addField('User', `<@` + person.id + `>`)
    .addField('Banned By', `<@` + message.author.id + `>`)
    .addField('Reason', reason)
  channel['punishments'].send(banEmbed)
}

function insufficientPermissions(channel) {
  const embed = new Discord.MessageEmbed()
    .setColor(color['orange'])
    .setDescription('Insufficient permissions to use this command.')
  channel.send(embed)
}

/**
 * Convenience functions
 */

/**
 * DMs a user a message
 * @param {*} user GuildMember
 * @param {*} message String or Embed, message to send user
 */
function dmMember(member, message) {
  member.send(message)
}

/**
 * Auto partner promo Module
 */

function promo() {
  let sentTo = ''
  channel['tournament_announcements'].send(announcement + '\n<@&' + roleID['tournaments'] + '>')
  for (const key in partner) {
    bot.guilds.cache.get(key).channels.cache.get(partner[key]).send(announcement)
    sentTo += '\n - ' + bot.guilds.cache.get(key).name
  }
  const embed = new Discord.MessageEmbed()
    .setColor(color['blue'])
    .setDescription('**Announcement successfully sent to: **' + sentTo)
  channel['trial_announcements'].send(embed)
}

bot.login(info.token)
