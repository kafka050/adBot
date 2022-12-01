const { Message } = require('discord.js')
const { main_server, categories, channels, colors, images } = require('../info')

/**
 * Logs when a message is edited
 * @param {Message} oldMessage Message object pre-change
 * @param {Message} newMessage Message object post-change
 */
module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.partial) await oldMessage.fetch()
  if (newMessage.partial) await newMessage.fetch()

  if (
    oldMessage.partial ||
    newMessage.channel.type === 'dm' ||
    newMessage.guild.id !== main_server ||
    oldMessage.channel.parent === categories.admin ||
    oldMessage.channel === channels.trial_announcements ||
    oldMessage.channel === channels.bot_testing ||
    oldMessage.channel === channels.tournament_announcements ||
    oldMessage.author.bot
  ) {
    return null
  }
  if (oldMessage.content.length >= 250) {
    oldMessage.content = oldMessage.content.slice(0, 250) + '...'
  }
  if (newMessage.content.length >= 250) {
    newMessage.content = newMessage.content.slice(0, 250) + '...'
  }
  const embed = {
    author: newMessage.author,
    color: colors.orange,
    thumbnail: images.ibex.orange,
    description: `**Message Edited in** <#${newMessage.channel}> [Jump to message](${newMessage.url})`,
    footer: `User ID: ${newMessage.author.id} | ${newMessage.createdAt}`,
    fields: [
      { name: 'Before', value: oldMessage.content },
      { name: 'After', value: newMessage.content },
    ],
  }
  return embed
}
