const { MessageEmbed } = require('discord.js')
const { colors, images, channels } = require('../../info')

module.exports = (message, person, reason) => {
  if (!person) {
    return new MessageEmbed().setColor(colors.blue).addField(`Error`, 'Could not find user ' + person)
  }
  const embed2 = new MessageEmbed()
    .setColor(colors.red)
    .setTitle('You have been banned from Alpine Esports')
    .setThumbnail(images.ibex.red)
    .addField(`Reason`, reason)
  person.send(embed2)

  setTimeout(function () {
    person.ban(reason)
  }, 5000)

  const banEmbed = new MessageEmbed()
    .setColor(colors.red)
    .setTitle('Ban')
    .setThumbnail(images.ibex.red)
    .addField('User', `<@` + person.id + `>`)
    .addField('Banned By', `<@` + message.author.id + `>`)
    .addField('Reason', reason)
  channels.punishments.send(banEmbed)
  return banEmbed
}
