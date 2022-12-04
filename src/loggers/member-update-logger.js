const { GuildMember } = require('discord.js')
const { main_server, images, channels } = require('../info')

/**
 * Logs when a member gets a new role
 * @param {GuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
function addRoleLog(oldMember, newMember) {
  for (const key of newMember.roles.cache.keys()) {
    if (oldMember.roles.cache.get(key)) continue
    const embed = {
      author: {
        name: newMember.nickname,
        icon_url: newMember.user.avatarURL(),
      },
      color: 0x28b61c,
      title: 'Given Role',
      thumbnail: {
        url: images.ibex.blue,
      },
      footer: {
        text: `User ID: ${newMember.id}`,
      },
      fields: [
        { name: 'User', value: newMember.toString() },
        { name: 'Role', value: newMember.roles.cache.get(key).toString() },
      ],
    }
    return embed
  }
}

/**
 * Logs when a member loses a role
 * @param {GuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
function removeRoleLog(oldMember, newMember) {
  for (const key of oldMember.roles.cache.keys()) {
    if (newMember.roles.cache.get(key)) continue
    const embed = {
      author: {
        name: newMember.nickname,
        icon_url: newMember.user.avatarURL(),
      },
      color: 0x28b61c,
      title: 'Removed from role',
      thumbnail: {
        url: images.ibex.blue,
      },
      footer: {
        text: `User ID: ${newMember.id}`,
      },
      fields: [
        { name: 'User', value: newMember.toString() },
        { name: 'Role', value: oldMember.roles.cache.get(key).toString() },
      ],
    }
    return embed
  }
}

/**
 * Logs when a member gains or loses a role
 * @param {GuildMember | import('discord.js').PartialGuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
module.exports = async (oldMember, newMember) => {
  if (oldMember.partial) oldMember = await oldMember.fetch()
  if (newMember.guild.id !== main_server) return null
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
    return addRoleLog(oldMember, newMember)
  }
  if (newMember.roles.cache.size < oldMember.roles.cache.size) {
    return removeRoleLog(oldMember, newMember)
  }
  return null
}
