const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const { roles, colors, images, channels } = require('../../info')
/**
 * Mutes 'person' for a specified amount of time, DM's 'person', logs the mute
 * @param {*} message Message Object
 * @param {*} person GuildMember or User Object, person to mute
 * @param {*} time Optional String, Duration of ban (s, m, h, d, w, y), time of mute
 * @param {*} reason Optional String, reason for mute
 */
module.exports = (message, person, time, reason) => {
  let author = message.author
  let role = message.guild.roles.fetch((r) => r.id === roles.muted)
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
  if (person.roles.highest.position >= message.guild.roles.cache.get(roles.staff).position) return
  if (author.id === person.id) {
    author = 'AutoMod'
  } else {
    author = `<@` + message.author.id + `>`
  }
  if (!person) {
    return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find user ' + person)
  }
  if (!role) {
    return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find the muted role.')
  }
  if (time === '1y' || time === '365d') {
    channels.punishments.send('<@&' + roles.admin + '> Please review the following mute for possible ban.')
  }
  person.roles.add(roles.muted)

  if (!time) {
    time = '24h'
  }
  if (!reason) {
    reason = 'No reason provided.'
  }
  if (author === 'AutoMod') {
    if (time === '365d' || time === '1y') {
      const embed = new MessageEmbed()
        .setAuthor(person.user.tag, person.user.avatarURL())
        .setColor(colors.red)
        .setTitle('User Muted')
        .setThumbnail(images.ibex.red)
        .addField('Duration', `Indefinite, message under review.`)
        .addField('Muted By', author)
        .addField(`Message: `, message)
        .setFooter('User ID: ' + person.id)
      channels.punishments.send(embed)
      const embed2 = new MessageEmbed()
        .setColor(colors.red)
        .setTitle('You have been muted')
        .setThumbnail(images.ibex.red)
        .addField(`Duration`, `Indefinite, message under review.`)
        .addField(`Reason`, reason)
        .addField(`Message`, message)
        .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
      person.user.send(embed2)
      return
    }
    const embed = new MessageEmbed()
      .setAuthor(person.user.tag, person.user.avatarURL())
      .setColor(colors.red)
      .setTitle('User Muted')
      .setThumbnail(images.ibex.red)
      .addField('Duration', `${ms(ms(time))}`)
      .addField('Muted By', author)
      .addField(`Message: `, message)
      .setFooter('User ID: ' + person.id)
    channels.punishments.send(embed)
    const embed2 = new MessageEmbed()
      .setColor(colors['red'])
      .setTitle('You have been muted')
      .setThumbnail(images['ibex']['red'])
      .addField(`Duration`, `${ms(ms(time))}`)
      .addField(`Reason`, reason)
      .addField(`Message`, message)
      .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
    person.user.send(embed2)
  } else {
    const embed = new MessageEmbed()
      .setAuthor(person.user.tag, person.user.avatarURL())
      .setColor(colors.red)
      .setTitle('User Muted')
      .setThumbnail(images.ibex.red)
      .addField('Duration', `${ms(ms(time))}`)
      .addField('Muted By', author)
      .addField(`Reason`, reason)
      .setFooter('User ID: ' + person.id)
    channels.punishments.send(embed)
    const embed2 = new MessageEmbed()
      .setColor(colors.red)
      .setTitle('You have been muted')
      .setThumbnail(images.ibex.red)
      .addField(`Duration`, `${ms(ms(time))}`)
      .addField(`Reason`, reason)
      .setFooter('If you think this mute was made by mistake, DM an Alpine Esports Admin.')
    person.user.send(embed2)
    return embed
  }

  setTimeout(function () {
    if (person.roles.cache.get(roles.muted) === undefined) {
      return
    }
    person.roles.remove(roles.muted)
    const embed = new MessageEmbed().setColor(colors.red).setDescription(`<@` + person.id + `> has been **unmuted**.`)
    channels.punishments.send(embed)
  }, ms(time))
}
