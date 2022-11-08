const { MessageEmbed } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

module.exports = (channel) => {
  if (channel.type === 'dm') return
  if (channel.guild.id === main_server) {
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setTitle('Channel Created')
      .setThumbnail(images.ibex.blue)
      .addField(`Channel`, channel)
    channels.logs.send(embed)
  }
}
