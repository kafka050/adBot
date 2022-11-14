const { MessageEmbed, GuildMember } = require('discord.js')
const { main_server, images, channels } = require('../info')

/**
 * Logs when a member gets a new role
 * @param {GuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
function addRoleLog(oldMember, newMember) {
  for (const role of newMember.roles.cache.array()) {
    if (oldMember.roles.cache.array().includes(role)) {
      const embed = new MessageEmbed()
        .setAuthor(newMember.user.tag, newMember.user.avatarURL())
        .setColor(`#28B61C`)
        .setTitle('Given Role')
        .setThumbnail(images.ibex.blue)
        .addField('User', `<@` + newMember.id + `>`)
        .addField('Role', `<@&` + role.id + `>`)
        .setFooter('User ID: ' + newMember.id)
      channels.logs.send(embed)
      return
    }
  }
}

/**
 * Logs when a member loses a role
 * @param {GuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
function removeRoleLog(oldMember, newMember) {
  for (const role of oldMember.roles.cache.array()) {
    if (!newMember.roles.cache.array().includes(role)) {
      const embed = new MessageEmbed()
        .setAuthor(newMember.user.tag, newMember.user.avatarURL())
        .setColor(`#28B61C`)
        .setTitle('Removed from Role')
        .setThumbnail(images.ibex.blue)
        .addField('User', `<@` + newMember.id + `>`)
        .addField('Role', `<@&` + role.id + `>`)
        .setFooter('User ID: ' + newMember.id)
      channels.logs.send(embed)
      return
    }
  }
}

/**
 * Logs when a member gains or loses a role
 * @param {GuildMember} oldMember Member object pre-change
 * @param {GuildMember} newMember Member object post-change
 */
module.exports = (oldMember, newMember) => {
  if (newMember.guild.id !== main_server) return
  if (newMember.roles.cache.array().length > oldMember.roles.cache.array().length) {
    addRoleLog(oldMember, newMember)
  }
  if (newMember.roles.cache.array().length < oldMember.roles.cache.array().length) {
    removeRoleLog(oldMember, newMember)
  }
}
