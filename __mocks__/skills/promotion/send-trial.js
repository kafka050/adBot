module.exports = {
  sendTrial: jest.fn((announcement) => {
    return {
      color: colors.pink,
      description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
    }
  }),
}
