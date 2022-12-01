const { Message } = require('discord.js')
const { colors, images, channels } = require('../../info')
const { sendMessage } = require('../../tools/utils')

/**
 * Bans a member and logs it in punishments channel
 * @param {Message} message Message object that triggers command
 * @param {String[]} args Array of arguments passed by user command call
 * @returns Embedded message to send in logs channel
 */
function ban(message, args) {
  if (!args) return
  const person = message.guild.member(message.mentions.users.first())
  if (!person) return new MessageEmbed().setColor(colors.blue).addField('Error', `Could not find user ${person}`)

  let reason = ''
  if (!args[1]) reason = 'No reason given.'
  else for (const arg in args.slice(1)) reason += ` ${arg}`

  const embed = {
    color: colors.red,
    title: 'You have been banned from Alpine Esports',
    thumbnail: {
      url: images.ibex.red,
    },
    fields: [{ name: 'Reason', value: reason }],
  }
  person.send({ embeds: embed })

  setTimeout(function () {
    person.ban(reason)
  }, 5000)

  const banEmbed = {
    color: colors.red,
    title: 'Ban',
    thumbnail: {
      url: images.ibex.red,
    },
    fields: [
      { name: 'User', value: `<@${person.id}>` },
      { name: 'Banned By', value: `<@${message.author.id}>` },
      { name: 'Reason', value: reason },
    ],
  }
  sendMessage({ embeds: [banEmbed] }, channels.punishments)
  return banEmbed
}
module.exports = ban
