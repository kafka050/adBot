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

bot.on('guildMemberAdd', (member) => {
  console.log('Log: Member Joined Server\n')
  if (member.guild.id === server_id) {
    const userCreated = member.user.createdAt.toString().split(' ')
    const finalString = userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3]
    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setThumbnail(image['ibex']['blue'])
      .setColor(color['blue'])
      .setTitle(`User Joined`)
      .addField(`Account created: `, finalString)
      .setFooter(`User ID: ` + member.id + '\nJoined: ' + member.joinedAt)
    channel['logs'].send(embed)
    channel['welcome'].send(
      `Welcome ` +
        member.toString() +
        ` to the official Discord server of **Alpine Esports!** ` +
        emote['ibex']['black'].toString(),
    )
    channel['member_count'].setName('Alpine Fam: ' + member.guild.memberCount)
    member.roles.add([roleID['alpine_fam'], roleID['tournaments']])
  }
})
bot.on('guildMemberRemove', (member) => {
  if (member.guild.id === server_id) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setColor(color['blue'])
      .setDescription(`<@` + member.id + `> has left.`)
      .setFooter('User ID: ' + member.id)
    channel['logs'].send(embed)
    channel['member_count'].setName('Alpine Fam: ' + member.guild.memberCount)
  }
})
bot.on('guildMemberUpdate', (oldMember, newMember) => {
  if (newMember.guild.id === server_id) {
    if (newMember.roles.cache.array().length > oldMember.roles.cache.array().length) {
      for (const role of newMember.roles.cache.array()) {
        if (!oldMember.roles.cache.array().includes(role)) {
          if (role.id === roleID['muted'] || role.id === roleID['alpine_fam'] || role.id === roleID['tournaments'])
            return
          const embed = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setColor(`#28B61C`)
            .setTitle('Given Role')
            .setThumbnail(image['ibex']['blue'])
            .addField('User', `<@` + newMember.id + `>`)
            .addField('Role', `<@&` + role.id + `>`)
            .setFooter('User ID: ' + newMember.id)
          channel['logs'].send(embed)
          return
        }
      }
    }
    if (newMember.roles.cache.array().length < oldMember.roles.cache.array().length) {
      for (const role of oldMember.roles.cache.array()) {
        if (!newMember.roles.cache.array().includes(role)) {
          if (role.id === roleID['muted']) return
          const embed = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setColor(`#28B61C`)
            .setTitle('Removed from Role')
            .setThumbnail(image['ibex']['blue'])
            .addField('User', `<@` + newMember.id + `>`)
            .addField('Role', `<@&` + role.id + `>`)
            .setFooter('User ID: ' + newMember.id)
          channel['logs'].send(embed)
          return
        }
      }
    }
  }
})
bot.on('messageDelete', async (message) => {
  if (message.partial) await message.fetch()

  if (message.author.bot) return
  if (message.guild.id === server_id) {
    if (message.content.charAt(0) === info.prefix) {
      return
    }
    if (
      message.channel.parent === info.categories['admin'] ||
      message.channel === channel['trial_announcements'] ||
      message.channel === channel['bot_testing'] ||
      message.channel === channel['tournament_seeding']
    ) {
      return
    }
    if (message.content.length >= 250) {
      message.content = message.content.slice(0, 250) + '...'
    }
    const embed = new Discord.MessageEmbed()
      .setColor(color['orange'])
      .setTitle('Message Deleted')
      .setThumbnail(image['ibex']['orange'])
      .addField(`Author`, message.author)
      .addField(`Message`, message.toString())
      .addField(`Channel`, `<#` + message.channel + `>`)
    channel['logs'].send(embed)
  }
})
bot.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.partial || newMessage.channel.type === 'dm') return
  if (newMessage.partial) await newMessage.fetch()
  if (newMessage.guild.id === info.main_server) {
    if (
      oldMessage.channel.parent === info.categories['admin'] ||
      oldMessage.channel === channel['trial_announcements'] ||
      oldMessage.channel === channel['bot_testing'] ||
      oldMessage.channel === channel['tournament_seeding']
    ) {
      return
    }
    if (oldMessage.author.id != `706358071017865237`) {
      if (oldMessage.content.length >= 250) {
        oldMessage.content = oldMessage.content.slice(0, 250) + '...'
      }
      if (newMessage.content.length >= 250) {
        newMessage.content = newMessage.content.slice(0, 250) + '...'
      }
      const embed = new Discord.MessageEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
        .setColor(color['orange'])
        .setThumbnail(image['ibex']['orange'])
        .setDescription(
          '**Message Edited in** <#' + newMessage.channel + `> ` + '[Jump to message](' + newMessage.url + ')',
        )
        .addField(`Before`, oldMessage.content)
        .addField(`After`, newMessage.content)
        .setFooter('User ID: ' + newMessage.author.id + ' | ' + newMessage.createdAt)
      channel['logs'].send(embed)
      autoMod(newMessage, newMessage.author)
    }
  }
})
bot.on('channelCreate', (_channel) => {
  if (_channel.type === 'dm') return
  if (_channel.guild.id === server_id) {
    const embed = new Discord.MessageEmbed()
      .setColor(color['blue'])
      .setTitle('Channel Created')
      .setThumbnail(image['ibex']['blue'])
      .addField(`Channel`, _channel)
    channel['logs'].send(embed)
  }
})
bot.on('channelDelete', async (_channel) => {
  if (_channel.partial) await _channel.fetch()
  if (_channel.guild.id === server_id) {
    if (_channel.type === 'dm') return
    const embed = new Discord.MessageEmbed()
      .setColor(color['blue'])
      .setTitle('Channel Deleted')
      .setThumbnail(image['ibex']['blue'])
      .addField(`Channel`, _channel)
    channel['logs'].send(embed)
  }
})
bot.on('roleCreate', (role) => {
  if (role.guild.id === server_id) {
    const embed = new Discord.MessageEmbed()
      .setColor(color['blue'])
      .setTitle('Role Created')
      .setThumbnail(image['ibex']['blue'])
      .addField(`Role`, role)
    channel['logs'].send(embed)
  }
})
bot.on('roleDelete', (role) => {
  if (role.guild.id === server_id) {
    const embed = new Discord.MessageEmbed()
      .setColor(color['blue'])
      .setTitle('Role Deleted')
      .setThumbnail(image['ibex']['blue'])
      .addField(`Role`, role)
    channel['logs'].send(embed)
  }
})
bot.on('roleUpdate', (oldRole, newRole) => {
  if (newRole.guild.id === server_id) {
    const changes = {
      name: '',
      hexColor: '',
      permissions: '',
    }
    let counter = 0
    if (!newRole.permissions.equals(oldRole.permissions)) {
      changes[2] = 'Permissions have been tampered with :sunglasses:'
    } else if (newRole.permissions.equals(oldRole.permissions)) {
      changes[2] = 'No changes.'
      counter++
    }
    if (newRole.name != oldRole.name) {
      changes[0] = oldRole.name.toString() + ' --> ' + newRole.name.toString()
    } else if (newRole.name === oldRole.name) {
      changes[0] = 'No changes.'
      counter++
    }
    if (newRole.hexColor != oldRole.hexColor) {
      changes[1] = oldRole.hexColor.toString() + ' --> ' + newRole.hexColor.toString()
    } else if (newRole.hexColor === oldRole.hexColor) {
      changes[1] = 'No changes.'
      counter++
    }
    if (counter < 3) {
      const embed = new Discord.MessageEmbed()
        .setColor(color['blue'])
        .setTitle('Role Modified')
        .setThumbnail(image['ibex']['blue'])
        .addField(`Name`, changes[0])
        .addField(`Hex Color`, changes[1])
        .addField(`Permissions`, changes[2])
      channel['logs'].send(embed)
    }
  }
})
bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.guild.id === server_id) {
    if (user.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    const message = reaction.message
    if (message.id != set_role_message && message.id != announcementID) return
    //Checks complete.
    if (message.id === set_role_message) {
      const member = reaction.message.guild.members.cache.get(user.id)
      let rank = ''
      for (const key in emote['rank']) {
        if (emote['rank'][key] === reaction.emoji) {
          rank = key
        }
      }
      for (const key in roleID['rank']) {
        if (key === rank) {
          member.roles.add(roleID['rank'][key])
        }
      }
    } else if (message.id === announcementID) {
      if (reaction.emoji.toString() === '✅') {
        const embed = new Discord.MessageEmbed().setColor(color['blue']).setDescription('Announcement sending...')
        reaction.message.channel.send(embed)
        promo()
      } else if (reaction.emoji.toString() === '🇽') {
        const embed = new Discord.MessageEmbed().setColor(color['orange']).setDescription('Announcement cancelled.')
        reaction.message.channel.send(embed)
      }
    }
  }
})
bot.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.guild.id === server_id) {
    if (user.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    const message = reaction.message
    if (message.id != set_role_message) return
    //Checks complete.

    const member = reaction.message.guild.members.cache.get(user.id)
    let rank = ''

    for (const key in emote['rank']) {
      if (emote['rank'][key] === reaction.emoji) {
        rank = key
      }
    }
    for (const key in roleID['rank']) {
      if (key === rank) {
        member.roles.remove(roleID['rank'][key])
      }
    }
  }
})

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
