const { Channel, ChannelType } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')
const { sendMessage } = require('../tools/utils')

/**
 * Logs creation of channel
 * @param {Channel} channel Discord channel that has been created
 */
module.exports = (channel) => {
  if (channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM || channel.guild.id !== main_server) {
    return null
  }
  const embed = {
    color: colors.blue,
    title: 'Channel created',
    thumbnail: {
      url: images.ibex.blue,
    },
    fields: [{ name: 'Channel', value: channel.toString() }],
  }
  return embed
}
