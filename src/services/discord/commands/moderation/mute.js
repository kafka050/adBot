const { MessageEmbed, Message, GuildMember } = require('discord.js')
const ms = require('ms')
const { roles, colors, images, channels } = require('../../info')

/**
 * Mutes a user and sends logs to punishments
 * @param {Message} message command message
 * @param {String[]} args {user to mute} {time} {reason}
 * @return Embed to send in logs
 */
function mute(message, args) {
  if (!args) return
  const person = message.mentions.members.first()
  if (!person) return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find user ' + person)

  let time = ''
  if (!args[1]) time = '24h'
  else time = args[1]

  let reason = ''
  if (!args[2]) reason = 'No reason given.'
  else for (const arg in args.slice(1)) reason += ` ${arg}`

  const mutedRole = message.guild.roles.fetch((r) => r.id === roles.muted)
  if (!mutedRole) return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find the muted role.')

  if (person.roles.highest.position >= message.guild.roles.cache.get(roles.staff).position) return

  if (time === '1y' || time === '365d') {
    channels.punishments.send('<@&' + roles.admin + '> Please review the following mute for possible ban.')
  }
  person.roles.add(roles.muted)
  const logEmbed = new MessageEmbed()
    .setTitle('User Muted')
    .setAuthor(person.user.tag, person.user.avatarURL())
    .setColor(colors.red)
    .setThumbnail(images.ibex.red)
    .addField('Muted By', message.member)
    .setFooter(`User ID: ${person.id}`)

  const dmEmbed = new MessageEmbed()
    .setTitle('You have been muted')
    .setColor(colors.red)
    .setThumbnail(images.ibex.red)
    .addField(`Reason`, reason)
    .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')

  let author = message.author
  if (author === 'AutoMod') {
    if (time === '365d' || time === '1y') {
      logEmbed.addField('Duration', `Indefinite, message under review.`)
      dmEmbed.addField(`Duration`, `Indefinite, message under review.`)
    }
    logEmbed.addField('Duration', `${ms(ms(time))}`)
    dmEmbed.addField(`Duration`, `${ms(ms(time))}`)
  } else {
    logEmbed.addField('Duration', `${ms(ms(time))}`)
    dmEmbed.addField(`Duration`, `${ms(ms(time))}`)
  }
  channels.punishments.send(logEmbed)
  person.send(dmEmbed)

  setTimeout(function () {
    if (!person.roles.cache.get(roles.muted)) return
    person.roles.remove(roles.muted)
    const embed = new MessageEmbed().setColor(colors.red).setDescription(`<@` + person.id + `> has been **unmuted**.`)
    channels.punishments.send(embed)
  }, ms(time))

  return logEmbed
}
module.exports = mute
