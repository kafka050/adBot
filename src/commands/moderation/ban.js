const { Message } = require('discord.js')
const { colors, images, channels } = require('../../info')
const { sendMessage } = require('../../tools/utils')

/**
 * Bans a member and logs it in punishments channel
 * @param {Message} message Message object that triggers command
 * @param {String[]} args Array of arguments passed by user command call
 * @returns Embedded message to send in logs channel
 */
async function ban(message, args) {
  if (!args) return
  const person = message.guild.members.cache.get(message.mentions.users.first().id)
  if (!person)
    return {
      color: colors.blue,
      fields: [{ name: 'Error', value: `Could not find user ${person}` }],
    }

  let reason = ''
  if (!args[1]) reason = 'No reason given.'
  else for (const arg in args.slice(1)) reason += arg

  const embed = {
    color: colors.red,
    title: 'You have been banned from Alpine Esports',
    thumbnail: {
      url: images.ibex.red,
    },
    fields: [{ name: 'Reason', value: reason }],
  }
  await sendMessage({ embeds: embed }, person.dmChannel)

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
  await sendMessage({ embeds: [banEmbed] }, channels.punishments)
  return banEmbed
}
module.exports = ban
