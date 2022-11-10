const { GuildMember } = require('discord.js')

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
}
