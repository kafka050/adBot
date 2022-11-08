const { main_server, emotes } = require('../info')

module.exports = async (reaction, user) => {
  if (reaction.message.guild.id === main_server) {
    if (user.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    const message = reaction.message
    //Checks complete.

    const member = reaction.message.guild.members.cache.get(user.id)

    // fix if doing reaction roles
    /*let rank = ''

    for (const key in emotes.rank) {
      if (emotes.rank[key] === reaction.emoji) {
        rank = key
      }
    }
    for (const key in roleID['rank']) {
      if (key === rank) {
        member.roles.remove(roleID['rank'][key])
      }
    }*/
  }
}
