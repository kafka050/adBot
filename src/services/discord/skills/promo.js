const { MessageEmbed } = require('discord.js')
const { channels, roles, partners, colors } = require('../info')

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
