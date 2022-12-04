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

  if (newMessage.channel.type === 'dm' || newMessage.guild.id !== main_server || oldMessage.author.bot) {
    return null
  }
  if (oldMessage.content.length >= 250) {
    oldMessage.content = oldMessage.content.slice(0, 250) + '...'
  }
  if (newMessage.content.length >= 250) {
    newMessage.content = newMessage.content.slice(0, 250) + '...'
  }
  return {
    color: colors.orange,
    title: 'Message edited',
    author: {
      name: newMessage.author.username,
      icon_url: newMessage.author.avatarURL(),
    },
    description: `**Message Edited in** ${newMessage.channel} [Jump to message](${newMessage.url})`,
    thumbnail: {
      url: images.ibex.orange,
    },
    fields: [
      { name: 'Before', value: oldMessage.content },
      { name: 'After', value: newMessage.content },
    ],
    footer: {
      text: `User ID: ${newMessage.author.id} | ${newMessage.createdAt}`,
    },
  }
}
