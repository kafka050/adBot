const { Message } = require('discord.js')
const { main_server, channels, categories, prefix, colors, images } = require('../info')

/**
 * Logs when a message is deleted
 * @param {Message} message message that was deleted
 */
module.exports = async (message) => {
  if (message.partial) message = await message.fetch()

  if (
    message.author.bot ||
    message.guild.id !== main_server ||
    message.content.charAt(0) == prefix ||
    message.channel.parent === categories.admin ||
    message.channel === channels.trial_announcements ||
    message.channel === channels.bot_testing ||
    message.channel === channels.tournament_seeding
  ) {
    return null
  }
  if (message.content.length >= 250) {
    message.content = message.content.slice(0, 250) + '...'
  }
  const embed = {
    color: colors.orange,
    title: 'Message Deleted',
    thumbnail: {
      url: images.ibex.blue,
    },
    fields: [
      { name: 'Author', value: message.author.toString() },
      { name: 'Message', value: message.content },
      { name: 'Channel', value: message.channel.toString() },
    ],
  }
  return embed
}
