const { MessageEmbed, Message } = require('discord.js')
const { main_server, channels, categories, prefix, colors, images } = require('../info')

/**
 * Logs when a message is deleted
 * @param {Message} message message that was deleted
 */
module.exports = async (message) => {
  if (message.partial) await message.fetch()

  if (message.author.bot) return
  if (message.guild.id === main_server) {
    if (message.content.charAt(0) === prefix) {
      return
    }
    if (
      message.channel.parent === categories.admin ||
      message.channel === channels.trial_announcements ||
      message.channel === channels.bot_testing ||
      message.channel === channels.tournament_seeding
    ) {
      return
    }
    if (message.content.length >= 250) {
      message.content = message.content.slice(0, 250) + '...'
    }
    const embed = new MessageEmbed()
      .setColor(colors.orange)
      .setTitle('Message Deleted')
      .setThumbnail(images.ibex.orange)
      .addField(`Author`, message.author)
      .addField(`Message`, message.toString())
      .addField(`Channel`, `<#` + message.channel + `>`)
    channels.logs.send(embed)
  }
}
