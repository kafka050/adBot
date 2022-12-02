const { GuildMember } = require('discord.js')
const { main_server, images, colors, channels, emotes } = require('../info')
const { sendMessage } = require('../tools/utils')

/**
 * Logs new users in the discord
 * @param {GuildMember} member Member being added
 */
module.exports = (member) => {
  if (member.guild.id != main_server) return
  const userCreated = member.user.createdAt.toString().split(' ')
  const finalString = userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3]
  const embed = {
    title: 'User joined',
    author: {
      name: member.nickname,
      icon_url: member.avatarURL(),
    },
    thumbnail: {
      url: images.ibex.blue,
    },
    color: colors.blue,
    footer: {
      text: `User ID: ${member.id}\nJoined: ${member.joinedAt}`,
    },
    fields: [{ name: 'Account created: ', value: finalString }],
  }
  return embed
}
