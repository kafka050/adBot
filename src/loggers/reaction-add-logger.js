const { MessageReaction, User } = require('discord.js')
const { main_server, channels, categories } = require('../info')

/**
 * Logs when reactions are made on messages
 * @param {MessageReaction} reaction reaction made
 * @param {User} user user that made the reaction
 */
module.exports = async (reaction, user) => {
  console.log('reaction added')
}
