const { MessageReaction, User } = require('discord.js')
const { announcementID, colors, main_server } = require('../info')
const { sendMessage } = require('../tools/utils')
const promo = require('./promotion/promo')

module.exports = {
  /**
   * Logs when reactions are made on messages
   * @param {MessageReaction} reaction reaction made
   * @param {User} user user that made the reaction
   */
  reactionAdd: async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.message.guild.id === main_server) {
      if (user.bot) return
      const message = reaction.message
      //Checks complete.
      if (message.id === announcementID.id) {
        if (reaction.emoji.toString() === '✅') {
          const embed = {
            color: colors.blue,
            description: 'Announcement sending...',
          }
          sendMessage({ embeds: [embed] }, reaction.message.channel)
          announcementID.id = ''
          promo(reaction.message.content)
        } else if (reaction.emoji.toString() === '🇽') {
          const embed = {
            color: colors.orange,
            description: 'Announcement cancelled.',
          }
          sendMessage({ embeds: [embed] }, reaction.message.channel)
          announcementID.id = ''
        }
      }
    }
  },
}
