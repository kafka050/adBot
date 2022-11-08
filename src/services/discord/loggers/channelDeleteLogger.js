const { MessageEmbed } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

module.exports = async (_channel) => {
  if (_channel.partial) await _channel.fetch()
  if (_channel.guild.id === main_server) {
    if (_channel.type === 'dm') return
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setTitle('Channel Deleted')
      .setThumbnail(images.ibex.blue)
      .addField(`Channel`, _channel)
    channels.logs.send(embed)
  }
}
