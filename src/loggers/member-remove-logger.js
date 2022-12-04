const { GuildMember } = require('discord.js')
const { main_server, colors, channels, images } = require('../info')

/**
 * Logs member leaving server
 * @param {GuildMember} member Member that left
 */
module.exports = async (member) => {
  if (member.partial) member = await member.fetch()
  if (member.guild.id !== main_server) return
  const embed = {
    author: member,
    color: colors.blue,
    thumbnail: {
      url: images.ibex.blue,
    },
    description: `<@${member.id}> has left.`,
    footer: `User ID: ${member.id}`,
  }
  return embed
}
