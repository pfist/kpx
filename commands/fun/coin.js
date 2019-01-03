import { Command } from 'discord-akairo'
import random from 'random-item'

class CoinCommand extends Command {
  constructor () {
    super('coin', {
      aliases: ['coin'],
      category: 'Fun',
      description: {
        content: 'Flip a coin.',
        usage: '!coin'
      },
      channelPermissions: 'guild',
      userPermissions: ['SEND_MESSAGES']
    })
  }

  async exec (message) {
    // Pick heads or tails & send response
    return message.util.send(`:white_circle: ${random(['Heads.', 'Tails.'])}`)
  }
}

export default CoinCommand
