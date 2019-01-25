import { Command } from 'discord-akairo'
import random from 'random-int'

class RollDiceCommand extends Command {
  constructor () {
    super('roll', {
      aliases: ['roll'],
      category: 'Fun',
      description: {
        content: 'Roll the dice.',
        usage: '!roll <amount> <type>'
      },
      channelPermissions: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'amount',
          type: arg => {
            // Fail if arg is empty or not a number
            if (!arg || isNaN(arg)) return null
            // Attempt to parse amount as integer
            const amount = parseInt(arg)
            // Amount must be between 1-10
            if (amount < 1 || amount > 10) return null
            // Return amount
            return amount
          },
          default: 1,
          description: 'The number of dice to roll. Can be between 1 and 10.',
          prompt: {
            start: 'How many dice do you want to roll? You can roll up to 10 dice.',
            retry: 'Please choose a number between 1 and 10.'
          }
        },
        {
          id: 'type',
          type: arg => {
            // Fail if dice type is unknown
            if (!arg.match(/^(d4|d6|d8|d10|d12|d20)$/)) return null
            // Return dice type
            return arg
          },
          default: 'd6',
          description: 'The type of dice. Can be d4, d6, d8, d10, d12 or d20.',
          prompt: {
            start: 'What type of dice?',
            retry: 'Please choose a valid type: d4, d6, d8, d10, d12 or d20.'
          }
        }
      ]
    })
  }

  async exec (message, { amount, type }) {
    // Initialize response
    let response = ':game_die:'
    // Get the number of sides each die has as an integer
    const sides = parseInt(type.substring(1))

    // Populate dice results
    for (let i = 0; i < amount; i++) {
      response += ` [**${random(1, sides)}**]`
    }

    // Send response
    return message.util.send(response)
  }
}

export default RollDiceCommand
