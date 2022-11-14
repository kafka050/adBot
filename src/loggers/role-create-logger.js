const { MessageEmbed, Role } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

/**
 * Logs the creation of roles in the server
 * @param {Role} role role being created
 */
module.exports = (role) => {
  if (role.guild.id === main_server) {
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setTitle('Role Created')
      .setThumbnail(images.ibex.blue)
      .addField(`Role`, role)
    channels.logs.send(embed)
  }
}
