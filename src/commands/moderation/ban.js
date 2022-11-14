const { MessageEmbed, Message } = require('discord.js')
const { colors, images, channels } = require('../../info')

/**
 * Bans a member and logs it in punishments channel
 * @param {Message} message Message object that triggers command
 * @param {String[]} args Array of arguments passed by user command call
 * @returns Embedded message to send in logs channel
 */
function ban(message, args) {
  if (!args) return
  const person = message.guild.member(message.mentions.users.first())
  if (!person) return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find user ' + person)

  let reason = ''
  if (!args[1]) reason = 'No reason given.'
  else for (const arg in args.slice(1)) reason += ` ${arg}`

  const embed2 = new MessageEmbed()
    .setColor(colors.red)
    .setTitle('You have been banned from Alpine Esports')
    .setThumbnail(images.ibex.red)
    .addField(`Reason`, reason)
  person.send(embed2)

  setTimeout(function () {
    person.ban(reason)
  }, 5000)

  const banEmbed = new MessageEmbed()
    .setColor(colors.red)
    .setTitle('Ban')
    .setThumbnail(images.ibex.red)
    .addField('User', `<@` + person.id + `>`)
    .addField('Banned By', `<@` + message.author.id + `>`)
    .addField('Reason', reason)
  channels.punishments.send(banEmbed)
  return banEmbed
}
module.exports = ban
