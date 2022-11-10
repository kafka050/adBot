const { MessageEmbed } = require('discord.js')
const { channels, roles, partners, colors } = require('../info')

/**
 * Sends announcement to main server and partner servers
 * @param {String} announcement announcement to send
 */
module.exports = (announcement) => {
  let sentTo = ''
  channels.tournament_announcements.send(announcement + '\n<@&' + roles.tournaments + '>')
  for (const obj in partners) {
    obj.channel.send(announcement)
    sentTo += '\n - ' + obj.server
  }
  const embed = new MessageEmbed()
    .setColor(colors.blue)
    .setDescription('**Announcement successfully sent to: **' + sentTo)
  channels.trial_announcements.send(embed)
}
