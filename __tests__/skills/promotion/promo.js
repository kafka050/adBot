const { partners } = require('../../../src/info')
const promo = require('../../../src/skills/promotion/promo')
const { sendMessage } = require('../../../src/tools/utils')
jest.mock('../../../src/tools/utils.js', () => {
  const original = jest.requireActual('../../../src/tools/utils.js')
  return {
    ...original,
    sendMessage: jest.fn(),
  }
})
sendMessage.mockImplementation(() => {
  return
})
test('should send to each partner', () => {
  promo('hi')
  expect(sendMessage).toHaveBeenCalledTimes(partners.length + 2)
})
