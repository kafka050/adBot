const { Channel, ChannelType } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')
const { sendMessage } = require('../tools/utils')

/**
 * Logs deletion of discord channel
 * @param {Channel} channel deleted discord channel
 */
module.exports = async (channel) => {
  if (channel.partial) channel = await channel.fetch()
  if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM || channel.guild.id !== main_server) {
    return null
  }
  const embed = {
    color: colors.blue,
    title: 'Channel deleted',
    thumbnail: {
      url: images.ibex.blue,
    },
    fields: [{ name: 'Channel', value: channel.name }],
  }
  return embed
}
