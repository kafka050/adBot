const { MessageEmbed, Role } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

/**
 * Logs the removal of a role in the server
 * @param {Role} role role being removed
 */
module.exports = (role) => {
  if (role.guild.id === main_server) {
    const embed = new MessageEmbed()
      .setColor(colors.blue)
      .setTitle('Role Deleted')
      .setThumbnail(images.ibex.blue)
      .addField(`Role`, role)
    channels.logs.send(embed)
  }
}
