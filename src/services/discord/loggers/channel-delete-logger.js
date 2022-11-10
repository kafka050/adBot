const { MessageEmbed, Channel } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

/**
 * Logs deletion of discord channel
 * @param {Channel} channel deleted discord channel
 */
module.exports = async (channel) => {
  if (channel.partial) await channel.fetch()
  if (channel.guild.id === main_server && channel.type !== 'dm') {
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setTitle('Channel Deleted')
      .setThumbnail(images.ibex.blue)
      .addField('Channel', channel.name)
    channels.logs.send(embed)
  }
}
