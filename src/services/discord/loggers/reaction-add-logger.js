const { MessageReaction, User } = require('discord.js')
const { main_server, channels, categories } = require('../info')

/**
 * Logs when reactions are made on messages
 * @param {MessageReaction} reaction reaction made
 * @param {User} user user that made the reaction
 */
module.exports = async (reaction, user) => {
  if (reaction.message.guild.id === main_server) {
    if (user.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    const message = reaction.message
    //Checks complete.

    // return when promo implemented
    /*if (message.id === announcementId) {
      if (reaction.emoji.toString() === '✅') {
        const embed = new MessageEmbed().setColor(colors.blue).setDescription('Announcement sending...')
        reaction.message.channel.send(embed)
        promo()
      } else if (reaction.emoji.toString() === '🇽') {
        const embed = new MessageEmbed().setColor(colors.orange).setDescription('Announcement cancelled.')
        reaction.message.channel.send(embed)
      }
    }*/
  }
}
