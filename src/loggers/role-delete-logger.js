const { Role } = require('discord.js')
const { main_server, colors, images, channels } = require('../info')

/**
 * Logs the removal of a role in the server
 * @param {Role} role role being removed
 */
module.exports = (role) => {
  if (role.guild.id !== main_server) return null
  const embed = {
    color: colors.blue,
    title: 'Role deleted',
    thumbnail: {
      url: images.ibex.blue,
    },
    fields: [{ name: 'Role', value: role.toString() }],
  }
  return embed
}
