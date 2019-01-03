import { Command } from 'discord-akairo'
import random from 'random-item'

class ChooseCommand extends Command {
  constructor () {
    super('choose', {
      aliases: ['choose'],
      category: 'Fun',
      description: {
        content: 'Give a list of items, get a random choice.',
        usage: '!choose <choices...>'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'choices',
          description: 'A comma-separated list of choices.',
          match: 'content',
          prompt: {
            start: 'Type a comma-separated list of choices.'
          }
        }
      ]
    })
  }

  async exec (message, { choices }) {
    // Parse the choices
    const choice = random(choices.split(','))

    // Send response
    return message.util.send(`:point_right: ${choice}`)
  }
}

export default ChooseCommand
