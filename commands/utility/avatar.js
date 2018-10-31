import { Command } from 'discord-akairo'

class AvatarCommand extends Command {
  constructor () {
    super('avatar', {
      aliases: ['avatar'],
      category: 'Utility',
      description: {
        content: `Get the large version of a user's avatar, or yourself if no argument is given.`,
        usage: '!avatar [user]'
      },
      channelRestriction: 'guild',
      userPermissions: ['VIEW_CHANNEL'],
      args: [
        {
          id: 'user',
          type: 'user',
          description: `The user who's avatar you want to get. Can be a username or ID.`,
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
      return message.reply(`Here is your avatar:`, {
        files: [avatar]
      })
    }

    // Checking the bot
    if (user.id === this.client.user.id) {
      return message.util.send(`Here is my avatar:`, {
        files: [avatar]
      })
    } else {
      // Checking anyone else
      return message.util.send(`Here is the avatar for **${user.username}**:`, {
        files: [avatar]
      })
    }
  }
}

export default AvatarCommand
