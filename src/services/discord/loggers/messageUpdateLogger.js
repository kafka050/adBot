const { MessageEmbed } = require('discord.js')
const { main_server, categories, channels, colors, images } = require('../info')

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.partial || newMessage.channel.type === 'dm') return
  if (newMessage.partial) await newMessage.fetch()
  if (newMessage.guild.id === main_server) {
    if (
      oldMessage.channel.parent === categories.admin ||
      oldMessage.channel === channels.trial_announcements ||
      oldMessage.channel === channels.bot_testing ||
      oldMessage.channel === channels.tournament_announcements
    ) {
      return
    }
    if (oldMessage.author.id != `706358071017865237`) {
      if (oldMessage.content.length >= 250) {
        oldMessage.content = oldMessage.content.slice(0, 250) + '...'
      }
      if (newMessage.content.length >= 250) {
        newMessage.content = newMessage.content.slice(0, 250) + '...'
      }
      const embed = new MessageEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
        .setColor(colors.orange)
        .setThumbnail(images.ibex.orange)
        .setDescription(
          '**Message Edited in** <#' + newMessage.channel + `> ` + '[Jump to message](' + newMessage.url + ')',
        )
        .addField(`Before`, oldMessage.content)
        .addField(`After`, newMessage.content)
        .setFooter('User ID: ' + newMessage.author.id + ' | ' + newMessage.createdAt)
      channels.logs.send(embed)
      autoMod(newMessage, newMessage.author)
    }
  }
}
