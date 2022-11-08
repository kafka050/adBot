const { MessageEmbed } = require('discord.js')
const { categories, channels, roles, colors } = require('../info')

module.exports = (message, author) => {
  /**userLength = message.mentions.users.array().length
      roleLength = message.mentions.roles.array().length
      if(userLength > 3 || roleLength > 2 || (userLength+roleLength) > 3) {
          const embed = new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.avatarURL())
              .setTitle("Mass Mention")
              .setColor(color['green'])
              .setDescription(message.member.toString() + " mass mentioned users/roles.")
          channel['logs'].send("<@&"+roleID['admin']+"> - Review mass mention for possible mute/ban")
          channel['logs'].send(embed)
          
          const embed2 = new Discord.MessageEmbed()
              .setColor(color['orange'])
              .setTitle("Warning")
              .setDescription("Please do not mass mention users. Doing so may result in mute or ban.")
              .setFooter("Alpine AutoMod")
            member.send(message)
          message.channel.send(embed2)
          return
      }*/
  const categoryWhitelist = [categories.admin, categories.staff, categories.community_teams, categories.information]
  if (categoryWhitelist.includes(message.channel.parent)) return
  if (
    message.content.toLowerCase().includes('steamcommunity') ||
    message.content.toLowerCase().includes('steampowered') ||
    message.content.toLowerCase().includes('imgur')
  )
    return
  if (
    message.channel === channels.community_clips &&
    (message.content.toLowerCase().includes('gifyourgame') ||
      message.content.toLowerCase().includes('imgur') ||
      message.content.toLowerCase().includes('gfycat') ||
      message.content.toLowerCase().includes('clips.twitch'))
  )
    return
  if (message.content.toLowerCase().includes('tracker')) return
  if (message.member.roles.highest.position >= message.guild.roles.cache.get(roles.staff).position) return
  for (const link of linkBlacklist) {
    if (message.content.toLowerCase().includes('@') && message.content.toLowerCase().includes(link)) {
      const embed = new MessageEmbed().setColor(colors.blue).setDescription("For your safety, don't post emails.")
      author.send(embed)
      message.delete()
    }
  }
}
