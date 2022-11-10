const { MessageEmbed, Role } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

/**
 * Logs when a role is changed in the server
 * @param {Role} oldRole Role pre-change
 * @param {Role} newRole Role post-change
 */
module.exports = (oldRole, newRole) => {
  if (newRole.guild.id === main_server) {
    const changes = {
      name: '',
      hexColor: '',
      permissions: '',
    }
    let counter = 0
    if (!newRole.permissions.equals(oldRole.permissions)) {
      changes[2] = 'Permissions have been tampered with :sunglasses:'
    } else if (newRole.permissions.equals(oldRole.permissions)) {
      changes[2] = 'No changes.'
      counter++
    }
    if (newRole.name != oldRole.name) {
      changes[0] = oldRole.name.toString() + ' --> ' + newRole.name.toString()
    } else if (newRole.name === oldRole.name) {
      changes[0] = 'No changes.'
      counter++
    }
    if (newRole.hexColor != oldRole.hexColor) {
      changes[1] = oldRole.hexColor.toString() + ' --> ' + newRole.hexColor.toString()
    } else if (newRole.hexColor === oldRole.hexColor) {
      changes[1] = 'No changes.'
      counter++
    }
    if (counter < 3) {
      const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setTitle('Role Modified')
        .setThumbnail(images.ibex.blue)
        .addField(`Name`, changes.name)
        .addField(`Hex Color`, changes.hexColor)
        .addField(`Permissions`, changes.permissions)
      channels.logs.send(embed)
    }
  }
}
