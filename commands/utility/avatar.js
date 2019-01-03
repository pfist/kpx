import { Command } from 'discord-akairo'

class AvatarCommand extends Command {
  constructor () {
    super('avatar', {
      aliases: ['avatar'],
      category: 'Utility',
      description: {
        content: `See the large version of a user's avatar.`,
        usage: '!avatar [user]'
      },
      channelRestriction: 'guild',
      userPermissions: ['SEND_MESSAGES'],
      args: [
        {
          id: 'user',
          type: 'user',
          description: `The user who's avatar you want to see. Can be a username or ID.`,
          default: message => message.author,
          prompt: {
            start: `Who's avatar do you want to see?`,
            retry: 'Please enter a valid username or ID.',
            optional: true
          }
        }
      ]
    })
  }

  async exec (message, { user }) {
    const avatar = await user.displayAvatarURL.split('?')[0]

    // Checking the author
    if (user.id === message.author.id) {
      return message.reply(`Here's your avatar:`, {
        files: [avatar]
      })
    }

    // Checking the bot
    if (user.id === this.client.user.id) {
      return message.util.send(`Here's my avatar:`, {
        files: [avatar]
      })

      return message.util.send({ embed })
    }

    // Checking anyone else
    return message.util.send(`Here's the avatar for **${user.tag}**:`, {
      files: [avatar]
    })
  }
}

export default AvatarCommand
