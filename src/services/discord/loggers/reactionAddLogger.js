const { main_server, channels, categories } = require('../info')

module.exports = async (reaction, user) => {
  if (reaction.message.guild.id === main_server) {
    if (user.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    const message = reaction.message
    //Checks complete.

    // return when promo implemented
    /*if (message.id === announcementI) {
      if (reaction.emoji.toString() === '✅') {
        const embed = new Discord.MessageEmbed().setColor(color['blue']).setDescription('Announcement sending...')
        reaction.message.channel.send(embed)
        promo()
      } else if (reaction.emoji.toString() === '🇽') {
        const embed = new Discord.MessageEmbed().setColor(color['orange']).setDescription('Announcement cancelled.')
        reaction.message.channel.send(embed)
      }
    }*/
  }
}
