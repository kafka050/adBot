const { channels, colors } = require('../../info')

module.exports = {
  sendTrial: (announcement) => {
    channels.trial_announcements.send(announcement).then(async (msg) => {
      await msg.react('✅')
      await msg.react('🇽')
    })
  },
}
