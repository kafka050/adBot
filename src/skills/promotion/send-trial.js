const { channels, colors, announcementID } = require('../../info')

module.exports = {
  sendTrial: (announcement) => {
    channels.trial_announcements.send(announcement).then(async (msg) => {
      announcementID.id = msg.id
      await msg.react('✅')
      await msg.react('🇽')
    })
  },
}
