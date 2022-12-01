const { GuildMember, Message, BaseChannel, Base, BaseGuildTextChannel } = require('discord.js')

module.exports = {
  /**
   * Sends welcome message for new members
   * @param {GuildMember} member new member of server
   */
  sendWelcome: (member) => {
    channels.welcome.send(
      `Welcome ${member.toString()} to the official discord server of **Alpine Esports!** ${emotes.ibex.black.toString()}`,
    )
  },
  /**
   * Updates member count voice channel
   * @param {GuildMember} member new member or leaving member
   */
  updateMemberCount: (member) => {
    channels.member_count.setName('Alpine Fam: ' + member.guild.memberCount)
  },
  /**
   * Sends message to channel
   * @param {Message} message message to send
   * @param {BaseGuildTextChannel} channel channel to send message in
   */
  sendMessage: (message, channel) => {
    return channel.send(message)
  },
}
