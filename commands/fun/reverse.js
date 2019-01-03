import { Command } from 'discord-akairo'

class ReverseCommand extends Command {
  constructor () {
    super('reverse', {
      aliases: ['reverse'],
      category: 'Fun',
      description: {
        content: 'Reverse a message.',
        usage: '!reverse <text>'
      },
      channelPermissions: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'text',
          type: 'string',
          description: 'The text you want to reverse.',
          match: 'content',
          prompt: {
            start: 'Type the text you want to reverse.'
          }
        }
      ]
    })
  }

  async exec (message, { text }) {
    // Reverse the text in place and send response
    return message.util.send(`:arrow_left: ${text.split('').reverse().join('')}`)
  }
}

export default ReverseCommand
