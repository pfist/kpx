import { Command } from 'discord-akairo'
import random from 'random-item'

class Magic8BallCommand extends Command {
  constructor () {
    super('8ball', {
      aliases: ['8ball'],
      category: 'Fun',
      description: {
        content: 'Ask the Magic 8-Ball a question.',
        usage: '!8ball <question>'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'question',
          type: 'string',
          description: 'The question you want to ask.',
          match: 'content',
          prompt: {
            start: 'What would you like to ask the Magic 8-Ball?'
          }
        }
      ]
    })
  }

  async exec (message, { question }) {
    // 8-ball responses
    const responses = [
      'It is certain.',
      'It is decidedly so.',
      'Without a doubt.',
      'Yes - definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      'Outlook good.',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      `Don't count on it.`,
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Very doubtful.'
    ]

    // Send response
    return message.util.send(`:8ball: ${random(responses)}`)
  }
}

export default Magic8BallCommand
