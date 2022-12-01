const { channels, roles, partners, colors } = require('../../info')
const { sendMessage } = require('../../tools/utils')

/**
 * Sends announcement to main server and partner servers
 * @param {String} announcement announcement to send
 */
module.exports = (announcement) => {
  let sentTo = ''
  sendMessage(announcement + '\n<@&' + roles.tournaments + '>', channels.tournament_announcements)
  for (const partner in partners) {
    sendMessage(announcement, partner.channel)
    sentTo += '\n - ' + partner.server
  }
  const embed = {
    color: colors.blue,
    description: `**Announcement successfully sent to:** ${sentTo}`,
  }
  sendMessage({ embeds: [embed] }, channels.trial_announcements)
}
